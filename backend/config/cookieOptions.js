const tokenCookieOptions = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
};

module.exports = {
    tokenCookieOptions,
};
