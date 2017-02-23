const express = require('express');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const { ErrorResponse, UserResponse, UserListResponse } = require(path.join(__dirname, '../', 'response'));

const User = mongoose.model('User');


//  Get the list of users
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err) return res.status(500).json(new ErrorResponse(err));
        return res.status(200).json(new UserListResponse(users));
    });
});

//  Get single users
router.get('/user/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) return res.status(500).json(new ErrorResponse(err));
        return res.status(200).json(new UserResponse(user));
    });
});

//  Remove single user
router.delete('/user/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err) return res.status(500).json(new ErrorResponse(err));
        return res.status(200).json(new UserResponse(user));
    });
});

//  Add single user
router.post('/user', (req, res) => {
    let user = new User(req.body);
    user.save((err, user) => {
        console.log(err);
        if(err) return res.status(500).json(new ErrorResponse(err));
        return res.status(200).json(new UserResponse(user));
    });
});

//  Update single user
router.put('/user/:id', (req, res) => {
    let user = new User(req.body);
    
    let date = new Date();
    user._id = undefined;
    user.date_updated = `${date.getDate()}.${((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}`;
    User.findByIdAndUpdate(req.params.id,
        { $set: user },
        { new: true },
        (err, user) => {
            if(err) return res.status(500).json(new ErrorResponse(err));
            return res.status(200).json(new UserResponse(user));
    });
});


//  Export the module
module.exports = router;