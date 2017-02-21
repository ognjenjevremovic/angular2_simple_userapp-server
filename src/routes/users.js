const express = require('express');
const path = require('path');
const router = express.Router();
const mongojs = require('mongojs');

const { UserModel, ErrorResponse, UserResponse, UserListResponse } = require(path.join(__dirname, '../', 'models', 'User'));

const env = process.env;
const db = mongojs(`mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_CONNECTION}/${env.DB_NAME}`, ['users']);
db.on('error', function(error) {
    console.log(error);
});
db.on('connect', function() {
    console.log(`
        Database connection SUCCESSFUL!
    `);
});


//  Get the list of users
router.get('/users', function(req, res) {
    db.users.find(function(err, users) {
        if(err) return res.status(500).json(new ErrorResponse(err));
        return res.status(200).json(new UserListResponse(users));
    });
});

//  Get single users
router.get('/user/:id', function(req, res) {
    db.users.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, user) {
        if(err) return res.status(500).json(new ErrorResponse(err));
        return res.status(200).json(new UserResponse(user));
    });
});

//  Remove single user
router.delete('/user/:id', function(req, res) {
    db.users.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, user) {
        if(err) return res.status(500).json(new ErrorResponse(err));
        return res.status(200).json(new UserResponse());
    });
});

//  Add single user
router.post('/user', function(req, res) {
    let user = new UserModel(req.body);
    console.log(user);

    db.users.save(new UserModel(req.body), function(err, user) {
        console.log(err);
        if(err) return res.status(500).json(new ErrorResponseModel(err));
        return res.status(200).json(new UserResponse(user));
    });
});

//  Update single user
router.put('/user/:id', function(req, res) {
    db.users.update(
        { _id: mongojs.ObjectId(req.params.id)},
        { $set: new UserModel(req.body) },
        function(err, user) {
            if(err) return res.status(500).json(new ErrorResponse(err));
            return res.status(200).json(new UserResponse());
    });
});


//  Export the module
module.exports = router;