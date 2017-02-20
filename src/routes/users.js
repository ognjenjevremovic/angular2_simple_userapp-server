const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

const db = mongojs(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CONNECTION}/${process.env.DB_NAME}`, ['users']);


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
        if(err) {
            return res
                .status(500)
                .json({
                    success: false,
                    error: err,
                    errorMessage: 'Ouch! Something went terribly wrong. . .'
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                error: null,
                users: users
            });
    });
});

//  Get single users
router.get('/user/:id', function(req, res) {
    let userId = req.params.id;
    console.log(mongojs.ObjectId(+userId));

    db.users.findOne({
        _id: mongojs.ObjectId(userId)
    }, function(err, user) {
        if(err) {
            return res
                .status(500)
                .json({
                    success: false,
                    error: err,
                    errorMessage: 'Ouch! Something went terribly wrong. . .'
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                error: null,
                user: user
            });
    });
});

//  Remove single user
router.delete('/user/:id', function(req, res) {
    let userId = req.params.id;

    db.users.remove({
        _id: mongojs.ObjectId(userId)
    }, function(err, user) {
        if(err) {
            return res
                .status(500)
                .json({
                    succcess: false,
                    error: err,
                    errorMessage: 'Ouch! Something went terribly wrong. . .'
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                error: null,
                user: user
            });
    });
});

//  Add single user
router.post('/user', function(req, res) {
    let user = req.body;

    db.users.save(user, function(err, user) {
        if(err) {
            return res
                .status(500)
                .json({
                    success: false,
                    error: err,
                    errorMessage: 'Ouch! Something went terribly wrong. . .'
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                error: null,
                user: user
            })
    });
});

//  Update single user
router.put('/user/:id', function(req, res) {
    let userId = req.params.id;
    let user = req.body;

    db.users.findAndModify({
        _id: userId,
    }, user, function(err, user) {
        if(err) {
            return res
                .status(500)
                .json({
                    succcess: false,
                    error: err,
                    errorMessage: 'Ouch! Something went terribly wrong. . .'
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                error: null,
                user: user
            });
    });
});

//  Export the module
module.exports = router;