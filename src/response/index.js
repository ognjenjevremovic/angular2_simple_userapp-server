const path = require('path');
const { UserResponse, UserListResponse } = require(path.join(__dirname, 'success'));

module.exports = {
    UserResponse, UserListResponse,
    ErrorResponse: require(path.join(__dirname, 'error'))
};