const UsersDB = require("../database/user.database");
const bcrypt = require("bcrypt");
const { rolesEnum, getRolesConfig } = require("../config/roles");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { tokenCookieOptions } = require("../config/cookieOptions");

const handleLogin = async (req, res) => {
    // check if inputs are valid
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res.status(400).json({
            message: "Username and password are required.",
            success: false,
        });

    // check if user exists in db
    const foundUser = await UsersDB.findOne({ username: user });
    if (!foundUser)
        return res.status(401).json({
            success: false,
            message: "Username or password incorrect",
        });

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        const [accessToken, refreshToken] = _generateTokens(foundUser.username);
        foundUser.refreshToken = refreshToken;

        const updatedUser = await UsersDB.findByIdAndUpdate(foundUser._id, {
            refreshToken,
        });

        // send cookie and response
        res.cookie("jwt", refreshToken, tokenCookieOptions);
        res.json({
            success: true,
            message: "Login Successful",
            user: {
                userId: updatedUser._id,
                username: username,
                accessToken: accessToken,
                roles: updatedUser.roles,
            },
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Username or password incorrect",
        });
    }
};

const handleLogout = async (req, res) => {
    try {
        // get inputs
        const cookies = req.cookies;

        // if cookie does not exists, return
        if (!cookies?.jwt) {
            return res.status(204).json({
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
            return res.status(204).json({
                success: true,
                message: "Log out successful",
            });
        }

        // update db to have refresh token as empty
        await UsersDB.findByIdAndUpdate(foundUser._id, {
            refreshToken: "",
        });

        // delete cookie and return
        res.clearCookie("jwt", tokenCookieOptions);
        return res
            .status(204)
            .json({ success: true, message: "Log out successful" });
    } catch (e) {
        console.log(e);
        return res
            .status(403)
            .json({ success: false, message: "Authorization Error" });
    }
};

const handleSignup = async (req, res) => {
    // check if data is recieved
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    }

    // check for duplicate usernames in the db
    const duplicate = await UsersDB.findOne({ username: user });
    if (duplicate) {
        return res
            .status(409)
            .json({ success: false, message: "Username exists" }); //Conflict
    }

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // generateTokens
        const [accessToken, refreshToken] = _generateTokens(user);

        //store the new user
        const newUser = await UsersDB.create({
            username: user,
            password: hashedPwd,
            refreshToken,
        });

        // send cookie and response
        res.cookie("jwt", refreshToken, tokenCookieOptions);
        res.status(201).json({
            success: true,
            message: "User Created Successfully",
            user: {
                userId: newUser._id,
                username: username,
                accessToken: accessToken,
                roles: newUser.roles,
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const handleRefreshToken = async (req, res) => {
    try {
        // get input
        const cookies = req.cookies;

        // if token not in cookie, return
        if (!cookies?.jwt) {
            return res.status(401).json({
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
        const { username } = await jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        // generate new tokens
        const [newAccessToken, newRefreshToken] = _generateTokens(username);

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

function _generateTokens(username) {
    const accessToken = jwt.sign(
        { username: username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        { username: username },
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
