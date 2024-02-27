const express = require("express");
const router = express.Router();
const userController = require("../../controller/user.controller");
const { verifyJWT } = require("../../middleware/verifyJWT.middleware");
const { verifyRoles } = require("../../middleware/verifyRoles.middleware");
const { rolesEnum } = require("../../config/roles.config");

router.use(verifyJWT);
router.get(
    "/id/:id",
    verifyRoles(rolesEnum.ADMIN, rolesEnum.EDITOR),
    userController.getUserById
);
router.get(
    "/filter",
    verifyRoles(rolesEnum.ADMIN, rolesEnum.EDITOR),
    userController.getUserByFilter
);
router.get(
    "/",
    verifyRoles(rolesEnum.ADMIN, rolesEnum.EDITOR),
    userController.getAllUsers
);
router.put(
    "/",
    verifyRoles(rolesEnum.ADMIN, rolesEnum.EDITOR),
    userController.updateUserInfo
);

module.exports = router;
