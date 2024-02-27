const { allowedOrigins } = require("../config/allowedOrigins.config");
const { CONSTANTS } = require("../config/constants.config");

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin) || CONSTANTS.ENV == "development") {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};

module.exports = {
    credentials,
};
