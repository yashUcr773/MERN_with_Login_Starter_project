const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyJWT } = require("../middleware/verifyJWT");
const { verifyRoles } = require("../middleware/verifyRoles");
const { rolesEnum } = require("../config/roles");

router.get(
    "/:id",
    verifyJWT,
    verifyRoles(rolesEnum.ADMIN, rolesEnum.EDITOR),
    userController.getUserById
);

router.get(
    "/",
    verifyJWT,
    verifyRoles(rolesEnum.ADMIN, rolesEnum.EDITOR),
    userController.getUsers
);

module.exports = router;
