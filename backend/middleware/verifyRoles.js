const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyRoles = (...allowedRoles) => {
    return async function (req, res, next) {
        try {
            if (!req?.userInfo?.userRoles) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized Access",
                });
            }

            const rolesArray = [...allowedRoles];
            const result = req.userInfo.userRoles
                .map((role) => {
                    return rolesArray.includes(role);
                })
                .find((value) => {
                    return value === true;
                });

            if (!result) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized Access",
                });
            }

            return next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({
                success: false,
                message: "Authorization Error",
            });
        }
    };
};

module.exports = { verifyRoles };
