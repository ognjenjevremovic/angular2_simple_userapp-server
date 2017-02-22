module.exports.UserModel = class {
    constructor({ name, email, location, avatar, bio, newUser }) {
        name ? this.name = name : null;
        email ? this.email = email : null;
        location ? this.location = location : null;
        avatar ? this.avatar = avatar : null;
        bio ? this.bio = bio : null;
        newUser ? this.date_joined = this.date(new Date()) : null;
        !newUser ? this.date_updated = this.date(new Date()) : null;
    }

    date(date) {
        return `${date.getDate()}.${(date.getMonth() + 1) <= 9 ? ('0' + (date.getMonth() + 1)) : date.getMonth()}.${date.getFullYear()}`;
    }
};

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