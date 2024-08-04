const express = require('express')
const app = express()
const session = require('express-session')
const connectionMongoDB  = require ("./connection")
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")



connectionMongoDB();
app.use(express.json());       
app.use(express.urlencoded({extended: true}));
app.use(session({ secret : 'my name is vikash'}));


app.use('/', userRoutes)
app.use('/', postRoutes)

app.listen(2000,() => {
    console.log('Project Started')
})