const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.handleSignup);
router.post("/login", authController.handleLogin);
router.get("/logout", authController.handleLogout);
router.get("/refresh", authController.handleRefreshToken);

module.exports = router;
