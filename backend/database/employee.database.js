const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        lastUpdatedBy: {
            type: String,
            required: true,
        },
        createdBy: {
            type: String,
            required: true,
            immutable: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
