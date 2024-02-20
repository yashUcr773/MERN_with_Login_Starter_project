const _userRoles = {
    USER: {
        USER: 6853,
    },
    EDITOR: {
        EDITOR: 4187,
    },
    ADMIN: {
        ADMIN: 3567,
    },
};

const rolesEnum = {
    USER: "USER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN",
};

function getRolesConfig(...roles) {
    return roles.reduce(
        (config, role) => ({ ...config, ..._userRoles[role] }),
        {}
    );
}

console.log((getRolesConfig(rolesEnum.USER))[rolesEnum.USER])

module.exports = {
    rolesEnum,
    getRolesConfig,
};
