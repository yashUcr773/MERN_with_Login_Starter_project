const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const { verifyJWT } = require("../../middleware/verifyJWT");
const { rolesEnum } = require("../../config/roles");
const { verifyRoles } = require("../../middleware/verifyRoles");

router.use(verifyJWT);
router
    .route("/")
    .get(verifyRoles(rolesEnum.USER), employeesController.getAllEmployees)
    .post(
        verifyRoles(rolesEnum.ADMIN, rolesEnum.EDITOR),
        employeesController.createNewEmployee
    )
    .put(
        verifyRoles(rolesEnum.ADMIN, rolesEnum.EDITOR),
        employeesController.updateEmployee
    )
    .delete(verifyRoles(rolesEnum.ADMIN), employeesController.deleteEmployee);

router
    .route("/:id")
    .get(verifyRoles(rolesEnum.USER), employeesController.getEmployee);

module.exports = router;
