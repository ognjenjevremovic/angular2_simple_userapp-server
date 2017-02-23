const mongoose = require('mongoose');
const { Schema } = mongoose;

let userNameSchema = new Schema({
    first: {
        required: true,
        type: String
    },
    last: {
        required: true,
        type: String
    }
}, {_id: false});
let locationSchema = new Schema({
    state: String,
    city: String,
    ZIP: Number
}, {_id: false});

let userSchema = new Schema({
    name: userNameSchema,
    email: {
        type: String,
        unique: true
    },
    location: locationSchema,
    date_joined: String,
    date_updated: String,
    bio: String,
    avatar: String
});
userSchema.pre('save', (next) => {
    console.log('saving!');
    this._id = mongoose.Types.ObjectId();
    next();
});
userSchema.pre('save', (next) => {
    let date = new Date();
    this.date_joined = `${date.getDate()}.${((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}`;
    next();
});
mongoose.model('User', userSchema, 'users');