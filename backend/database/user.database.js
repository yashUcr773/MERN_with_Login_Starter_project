const mongoose = require("mongoose");
const { rolesEnum, getRolesConfig } = require("../config/roles.config");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
            trim: true,
        },
        lastname: {
            type: String,
            required: true,
            trim: true,
        },
        roles: {
            [rolesEnum.USER]: {
                type: Number,
                default: getRolesConfig(rolesEnum.USER)[rolesEnum.USER],
            },
            [rolesEnum.EDITOR]: Number,
            [rolesEnum.ADMIN]: Number,
        },
        refreshToken: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
