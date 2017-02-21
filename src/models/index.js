const path = require('path');
const { UserModel, UserResponse, UserListResponse } = require(path.join(__dirname, 'User'));

module.exports = {
    UserModel, UserResponse, UserListResponse,
    ErrorResponse: require(path.join(__dirname, 'Error'))
};