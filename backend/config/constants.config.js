require("dotenv").config();
const CONSTANTS = {
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    PORT: process.env.PORT,
    ENV: process.env.ENV,
    FEURL: "http://localhost:5173",
    NOTFOUND: "http://localhost:5173/notfound",
};

module.exports = {
    CONSTANTS,
};
