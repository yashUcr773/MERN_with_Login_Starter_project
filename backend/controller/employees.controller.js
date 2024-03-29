const EMPLOYEES_DB = require("../database/employee.database");
const {
    EMPLOYEE_CREATE_VALIDATOR,
    EMPLOYEE_UPDATE_VALIDATOR,
} = require("../validation/employee.validation");

/**
 * Get all employees
 * Need valid JWT to access this route
 * Accessible by all roles
 */
const getAllEmployees = async (req, res) => {
    try {
        let employees = await EMPLOYEES_DB.find({});
        return res.status(200).json({
            success: true,
            employees,
            message: "Employees Found",
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

/**
 * Create a new Employee
 * Need valid JWT to access this route
 * Accessible by Admin and Editor
 */
const createNewEmployee = async (req, res) => {
    try {
        const { firstname, lastname } = req.body;
        const { success, error } = EMPLOYEE_CREATE_VALIDATOR.safeParse({
            firstname,
            lastname,
        });

        if (!success) {
            return res.status(400).json({
                message: "Firstname and Lastname are required.",
                success: false,
                error: error.issues,
            });
        }

        const newEmployee = await EMPLOYEES_DB.create({
            firstname,
            lastname,
            lastUpdatedBy: req.userInfo.userId,
            createdBy: req.userInfo.userId,
        });

        return res.status(201).json({
            success: true,
            message: "Employee Added",
            employee: newEmployee,
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

/**
 * Update Employee information by Id
 * Need valid JWT to access this route
 * Accessible by Admin and Editor
 */
const updateEmployee = async (req, res) => {
    try {
        const { id, firstname, lastname } = req.body;
        const employee = await EMPLOYEES_DB.findOne({ _id: id });

        const { success, error } = EMPLOYEE_UPDATE_VALIDATOR.safeParse({
            firstname,
            lastname,
        });

        if (!success) {
            return res.status(400).json({
                message: "Firstname or Lastname are required.",
                success: false,
                error: error.issues,
            });
        }

        if (!employee) {
            return res.status(400).json({
                success: false,
                message: `Employee ID ${id} not found`,
            });
        }

        const newEmployee = {};
        if (firstname) {
            newEmployee.firstname = firstname;
        }
        if (lastname) {
            newEmployee.lastname = lastname;
        }
        newEmployee.lastUpdatedBy = req.userInfo.userId;
        const updatedEmployee = await EMPLOYEES_DB.findByIdAndUpdate(
            id,
            { ...newEmployee },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "employee updated",
            employee: updatedEmployee,
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

/**
 * Delete Employee by Id
 * Need valid JWT to access this route
 * Accessible by Admin
 */
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.body;
        const employee = await EMPLOYEES_DB.findOne({ _id: id });

        if (!employee) {
            return res.status(400).json({
                success: true,
                message: `Employee ID ${req.body.id} not found`,
            });
        }

        const deletedEmployee = await EMPLOYEES_DB.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "employee deleted",
            employee: deletedEmployee,
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

/**
 * Get employee by Id
 * Need valid JWT to access this route
 * Accessible by All Roles
 */
const getEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await EMPLOYEES_DB.findOne({ _id: id });
        if (!employee) {
            return res.status(400).json({
                success: false,
                message: `Employee ID ${req.params.id} not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: "employee found",
            employee,
        });
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

const getEmployeeByFilter = async (req, res) => {
    try {
        const mask = req.query.mask || "";
        const regexFilter = new RegExp(mask, "i");
        const employees = await EMPLOYEES_DB.find({
            $or: [
                { firstname: { $regex: regexFilter } },
                { lastname: { $regex: regexFilter } },
            ],
        });
        return res.status(200).json({
            success: true,
            message: "Employees Found",
            employees,
        });
    } catch (e) {
        console.log(e);
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getEmployeeByFilter,
};
