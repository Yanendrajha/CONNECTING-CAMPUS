const userModel = require('../models/user');
const bcrypt = require('bcrypt')
const session = require('express-session')


signupUser = async (req, res) => {
    try {
        const {password, username, name, email } = req.body;
        const hash = await bcrypt.hash(password, 12);
        const newUser = new userModel({
            username,
            password: hash,
            name,
            email
        })

        await newUser.save();
        req.session.user = {
            name: newUser.username,
            id: newUser._id
        }

        res.send("user signed up successfully!!")
    } catch (err) {
        if(err.code == "11000"){
            res.status(400).send("Username already exists")
        }
        console.log(err)
        res.status(500).send("Server Error")
    }
}

async function login(req, res) {
    const { password, username } = req.body;
    const user = await userModel.findOne({ username });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid === true) {
        
        req.session.user = {
            name: user.username,
            id: user._id
        }
        res.send("logged in successfully")
    }
    else {
        res.status(400)
        res.send("try signup!!")
    }
}

async function getAllUsers(req, res){
    const allUsers = await userModel.find({})
    res.send(allUsers)
}

async function logout(req, res) {
    delete req.session.user;
    res.send("logged out")
}

module.exports = {
    signupUser,
    login,
    logout,
    getAllUsers
}