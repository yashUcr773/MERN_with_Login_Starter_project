const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
    try {
        const authHeader =
            req.headers.authorization || req.headers.Authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication Error",
            });
        }

        const token = authHeader.split(" ")[1];

        const { userInfo } = await jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.userInfo = userInfo;

        return next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({
            success: false,
            message: "Authentication Error",
        });
    }
};

module.exports = { verifyJWT };
