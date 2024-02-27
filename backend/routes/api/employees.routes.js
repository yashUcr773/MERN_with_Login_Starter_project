const express = require("express");
const router = express.Router();
const employeesController = require("../../controller/employees.controller");
const { verifyJWT } = require("../../middleware/verifyJWT.middleware");
const { rolesEnum } = require("../../config/roles.config");
const { verifyRoles } = require("../../middleware/verifyRoles.middleware");

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

router.get(
    "/filter",
    verifyRoles(rolesEnum.ADMIN, rolesEnum.EDITOR, rolesEnum.USER),
    employeesController.getEmployeeByFilter
);

router
    .route("/:id")
    .get(verifyRoles(rolesEnum.USER), employeesController.getEmployee);

module.exports = router;
