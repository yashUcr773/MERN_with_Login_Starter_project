const EmployeesDB = require("../database/employee.database");
const {
    EMPLOYEE_CREATE_VALIDATOR,
    EMPLOYEE_UPDATE_VALIDATOR,
} = require("../validations/employee.validations");

/**
 * Get all employees
 * Need valid JWT to access this route
 * Accessible by all roles
 */
const getAllEmployees = async (req, res) => {
    try {
        let employees = await EmployeesDB.find(
            {},
            { firstname: 1, lastname: 1, _id: 1 }
        );
        res.status(200).json({
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

        const newEmployee = await EmployeesDB.create({
            firstname,
            lastname,
        });

        res.status(201).json({
            success: true,
            message: "Employee Added",
            employee: {
                firstname: newEmployee.firstname,
                lastname: newEmployee.lastname,
                employeeId: newEmployee._id,
            },
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
        const employee = await EmployeesDB.findOne({ _id: id });

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
        const updatedEmployee = await EmployeesDB.findByIdAndUpdate(id, {
            newEmployee,
        });
        return res.status(200).json({
            success: true,
            message: "employee updated",
            employee: {
                firstname: updatedEmployee.firstname,
                lastname: updatedEmployee.lastname,
                employeeId: updatedEmployee._id,
            },
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
        const employee = await EmployeesDB.findOne({ _id: id });

        if (!employee) {
            return res.status(400).json({
                success: true,
                message: `Employee ID ${req.body.id} not found`,
            });
        }

        const deletedEmployee = await EmployeesDB.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "employee deleted",
            employee: {
                firstname: deletedEmployee.firstname,
                lastname: deletedEmployee.lastname,
                employeeId: deletedEmployee._id,
            },
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
        const { id } = req.body;
        const employee = await EmployeesDB.findOne({ _id: id });
        if (!employee) {
            return res.status(400).json({
                success: false,
                message: `Employee ID ${req.params.id} not found`,
            });
        }
        return res.status(200).json({
            success: true,
            message: "employee found",
            employee: {
                firstname: employee.firstname,
                lastname: employee.lastname,
                employeeId: employee._id,
            },
        });
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message });
    }
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
};
