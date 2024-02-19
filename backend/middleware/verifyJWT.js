const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.sendStatus(401);

        const token = authHeader.split(" ")[1];

        const { username } = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = username;
        return next();
    } catch (e) {
        console.log(e);
        return res.sendStatus(403);
    }
};

module.exports = { verifyJWT };
