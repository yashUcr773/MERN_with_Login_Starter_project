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

function getCodeForRole(role) {
    return _userRoles[role][role];
}

function convertRolesToArray(userRoles) {
    return Object.values(userRoles).filter((value) => value);
}

module.exports = {
    rolesEnum,
    getRolesConfig,
    convertRolesToArray,
    getCodeForRole,
};
