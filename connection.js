const mongoose = require("mongoose");
const url= "mongodb+srv://yanendrajha37:Xmv945XiyyYgJtVY@cluster0.ayi7fwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/posting"

async function connectionMongoDB(){
    return mongoose.connect(url).then(() => {
        console.log("connected to mongodb");
    })
}

module.exports = connectionMongoDB;