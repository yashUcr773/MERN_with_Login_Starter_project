const mongoose = require("mongoose");
const { rolesEnum, getRolesConfig } = require("../config/roles");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        roles: {
            [rolesEnum.USER]: {
                type: Number,
                default: getRolesConfig(rolesEnum.USER)[rolesEnum.USER],
            },
            [rolesEnum.EDITOR]: Number,
            [rolesEnum.ADMIN]: Number,
        },
        password: {
            type: String,
            required: true,
        },
        refreshToken: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", usersSchema);
