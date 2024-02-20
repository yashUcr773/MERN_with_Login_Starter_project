const UsersDB = require("../database/user.database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { tokenCookieOptions } = require("../config/cookieOptions");
const {
    USER_SIGNUP_VALIDATOR,
    USER_SIGNIN_VALIDATOR,
} = require("../validations/user.validations");
const { convertRolesToArray } = require("../config/roles");

/**
Takes in username and password from request.
Checks if user and password exists in database.
Sets refresh token in DB and cookie
Returns found user object and accesstoken
*/
const handleLogin = async (req, res) => {
    try {
        // check if inputs are valid
        const { username, password } = req.body;
        const { success, error } = USER_SIGNIN_VALIDATOR.safeParse({
            username,
            password,
        });

        if (!success) {
            res.cookie("jwt", "", tokenCookieOptions);
            return res.status(400).json({
                message: "Username and password are required.",
                success: false,
                error: error.issues,
            });
        }

        // check if user exists in db
        const foundUser = await UsersDB.findOne({ username });
        if (!foundUser) {
            res.cookie("jwt", "", tokenCookieOptions);

            return res.status(401).json({
                success: false,
                message: "Username or password incorrect",
            });
        }

        // evaluate password
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) {
            res.cookie("jwt", "", tokenCookieOptions);

            return res.status(401).json({
                success: false,
                message: "Username or password incorrect",
            });
        }
        const [accessToken, refreshToken] = _generateTokens(
            foundUser._id,
            foundUser.username,
            foundUser.roles
        );
        foundUser.refreshToken = refreshToken;

        const updatedUser = await UsersDB.findByIdAndUpdate(foundUser._id, {
            refreshToken,
        },{new:true});

        // send cookie and response
        res.cookie("jwt", refreshToken, tokenCookieOptions);
        return res.json({
            success: true,
            message: "Login Successful",
            user: {
                userId: updatedUser._id,
                username: username,
                accessToken: accessToken,
                roles: convertRolesToArray(updatedUser.roles),
            },
        });
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ success: false, message: "Server Error" });
    }
};

/**
Gets refresh token from cookie, if not found, return
Delete refresh token in DB and cookie
Returns
*/
const handleLogout = async (req, res) => {
    try {
        // get inputs
        const cookies = req.cookies;

        // if cookie does not exists, return
        if (!cookies?.jwt) {
            return res.status(200).json({
                success: true,
                message: "Log out successful",
            });
        }

        // get refresh token
        const refreshToken = cookies["jwt"];

        // find user from db with same refresh token
        const foundUser = await UsersDB.findOne(
            {
                refreshToken: refreshToken,
            },
            { _id: 1 }
        );

        // if user does not exist, delete cookie and return
        if (!foundUser) {
            res.clearCookie("jwt", tokenCookieOptions);
            return res.status(200).json({
                success: true,
                message: "Log out successful",
            });
        }

        // update db to have refresh token as empty
        await UsersDB.findByIdAndUpdate(foundUser._id, {
            refreshToken: "",
        },{new:true});

        // delete cookie and return
        res.clearCookie("jwt", tokenCookieOptions);
        return res
            .status(200)
            .json({ success: true, message: "Log out successful" });
    } catch (e) {
        console.log(e);
        return res
            .status(403)
            .json({ success: false, message: "Authorization Error" });
    }
};

/**
Takes in username and password from request.
Checks if user and password exists in database.
Sets user, refresh token in DB and cookie.
Returns created user object and accesstoken.
TODO: Update to make only 1 db call to create user and set refresh token
*/
const handleSignup = async (req, res) => {
    try {
        // check if inputs are valid
        const { username, password } = req.body;
        const { success, error } = USER_SIGNUP_VALIDATOR.safeParse({
            username,
            password,
        });

        if (!success) {
            return res.status(400).json({
                message: "Username and password are required.",
                success: false,
                error: error.issues,
            });
        }

        // check for duplicate usernames in the db
        const duplicate = await UsersDB.findOne({ username: username });
        if (duplicate) {
            return res
                .status(409)
                .json({ success: false, message: "Username exists" }); //Conflict
        }

        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //store the new user
        const newUser = await UsersDB.create({
            username: username,
            password: hashedPassword,
            refreshToken: "",
        });

        // generate tokens
        const [accessToken, refreshToken] = _generateTokens(
            newUser._id,
            newUser.username,
            newUser.roles
        );

        // add refresh token in DB
        const updatedUser = await UsersDB.findByIdAndUpdate(newUser.id, {
            refreshToken: refreshToken,
        },{new:true});

        // send cookie and response
        res.cookie("jwt", refreshToken, tokenCookieOptions);
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                userId: updatedUser._id,
                username: updatedUser.username,
                accessToken: accessToken,
                roles: convertRolesToArray(updatedUser.roles),
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

/**
Gets refresh token from cookie, if not found, return
find user with said refresh token from DB
Delete refresh token in DB and cookie
Returns
*/
const handleRefreshToken = async (req, res) => {
    try {
        // get input
        const cookies = req.cookies;

        // if token not in cookie, return
        if (!cookies?.jwt) {
            return res.status(403).json({
                success: false,
                message: "Authorization Error",
            });
        }

        // get token
        const refreshToken = cookies["jwt"];

        // find user in DB
        const foundUser = await UsersDB.findOne({ refreshToken });

        // If user not found
        if (!foundUser) {
            return res.status(403).json({
                success: false,
                message: "Authorization Error",
            });
        }

        // verify if token is correct
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // generate new tokens
        const [newAccessToken, newRefreshToken] = _generateTokens(
            foundUser._id,
            foundUser.username,
            foundUser.roles
        );

        return res.status(200).json({
            success: true,
            message: "Token Refreshed",
            newAccessToken,
        });
    } catch (e) {
        return res.status(403).json({
            success: false,
            message: "Authorization Error",
        });
    }
};

/**
Takes in userId and username and userRoles.
Generate accessToken and refreshToken
return [accessToken, refreshToken]
*/
function _generateTokens(userId, username, userRoles) {
    const roles = convertRolesToArray(userRoles);
    const accessToken = jwt.sign(
        {
            userInfo: {
                username,
                userId,
                userRoles: roles,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        {
            userInfo: {
                username,
                userId,
                userRoles: roles,
            },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    return [accessToken, refreshToken];
}

module.exports = {
    handleSignup,
    handleLogin,
    handleLogout,
    handleRefreshToken,
};
