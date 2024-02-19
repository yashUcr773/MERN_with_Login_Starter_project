const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {
        this.users = data;
    },
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
const { tokenCookieOptions } = require("../config/cookieOptions");

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    const foundUser = usersDB.users.find((person) => person.username === user);
    if (!foundUser) return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const accessToken = jwt.sign(
            { username: foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        const otherUsers = usersDB.users.filter(
            (user) => user.username != foundUser.username
        );
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        );

        res.cookie("jwt", refreshToken, tokenCookieOptions);
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
};

const handleLogout = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204);
        const refreshToken = cookies["jwt"];

        const foundUser = usersDB.users.find(
            (person) => person.refreshToken === refreshToken
        );
        if (!foundUser) {
            res.clearCookie("jwt", tokenCookieOptions);
            return res.sendStatus(204);
        }

        const otherUsers = usersDB.users.filter(
            (user) => user.refreshToken != foundUser.refreshToken
        );
        const currentUser = { ...foundUser, refreshToken: "" };
        usersDB.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        );

        res.clearCookie("jwt", tokenCookieOptions);

        res.sendStatus(204);
    } catch (e) {
        console.log(e);
        return res.sendStatus(403);
    }
};

const handleSignup = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    // check for duplicate usernames in the db
    const duplicate = usersDB.users.find((person) => person.username === user);
    if (duplicate) return res.sendStatus(409); //Conflict
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = { username: user, password: hashedPwd };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        );
        res.status(201).json({ success: `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.sendStatus(401);

        const refreshToken = cookies["jwt"];

        const foundUser = usersDB.users.find(
            (person) => person.refreshToken === refreshToken
        );
        if (!foundUser) return res.sendStatus(403);

        const { username } = await jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const accessToken = jwt.sign(
            { username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        res.json({ accessToken });
    } catch (e) {
        return res.sendStatus(403);
    }
};

module.exports = {
    handleSignup,
    handleLogin,
    handleLogout,
    handleRefreshToken,
};
