const EmployeesDB = require("../database/employee.database");

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

const createNewEmployee = async (req, res) => {
    try {
        const { firstname, lastname } = req.body;

        if (!firstname || !lastname) {
            return res.status(400).json({
                success: false,
                message: "First and last names are required.",
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

const updateEmployee = async (req, res) => {
    try {
        const { id, firstname, lastname } = req.body;
        const employee = await EmployeesDB.findOne({ _id: id });

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
