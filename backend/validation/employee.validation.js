const zod = require("zod");

const EMPLOYEE_CREATE_VALIDATOR = zod.object({
    firstname: zod.string().min(4).max(32),
    lastname: zod.string().min(4).max(32),
});

const EMPLOYEE_UPDATE_VALIDATOR = zod.object({
    firstname: zod.string().min(4).max(32).optional(),
    lastname: zod.string().min(4).max(32).optional(),
});

module.exports = {
    EMPLOYEE_CREATE_VALIDATOR,
    EMPLOYEE_UPDATE_VALIDATOR,
};
