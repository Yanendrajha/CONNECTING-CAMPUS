const mongoose = require('mongoose');

const rule = new mongoose.Schema({
    username : {
        type : String,
        required: [ true, "username is Necessary"],
        unique : true,

    },
    password : {
        type : String,
        required : [ true, "password is Necessary"],
    },
    name : {
        type : String,
        required : [ true, "name is Necessary"],
    },
    email : {
        type : String,
    }
})

const userModel = mongoose.model("user", rule);

module.exports = userModel;
