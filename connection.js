const mongoose = require("mongoose");
require('dotenv').config();

const url = "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.ayi7fwq.mongodb.net/posting"
async function connectionMongoDB(){
    return mongoose.connect(url).then(() => {
        console.log("connected to mongodb");
    })
}

module.exports = connectionMongoDB;