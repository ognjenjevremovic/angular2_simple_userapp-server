module.exports.UserResponse = class {
    constructor(userObject) {
        this.success = true;
        this.error = null;
        userObject ? this.user = userObject : null;
    }
};

module.exports.UserListResponse = class {
    constructor(usersList) {
        this.success = true;
        this.error = null;
        this.length = usersList.length;
        this.users = usersList;
    }
};