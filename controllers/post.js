const postModel = require('../models/post')
const middleWares = require('../middlewares/index')

/*
Routes
Get all post(loggedIn)
Get one post(loggedIn)
Edit one post(isOwner)
Delete one post(isOwner)
Add a like(loggedin middleware)
Add a comment (loggedin middleware)
*/

// Get all post
const getPost = async (req, res) => {
    try {
        const allPosts = await postModel.find({})
        res.send(allPosts)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

// get one post
const getOne = async (req, res) => {
    try {
        const onePost = await postModel.findById(req.params.id)
        res.send(onePost)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

// create post 
const createPost = async (req, res) => {
    console.log(req.session.name)
    console.log(req.session.id)
    try {
        const post = new postModel({
            title: req.body.title,
            content: req.body.content,
            author: req.session.name,
            authorId: req.session.id,
            likes: [],
            comments: []
        })
    

        await post.save()
        res.status(201)
        res.send("Post created successfully")

    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

// edit post
const editPost = async (req, res) => {
    try {
        await postModel.findByIdAndUpdate(req.params.id, req.body)
        res.send("Post updated successfully")
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

// delete post
const deletePost = async (req, res) => {
    try {
        await postModel.findByIdAndDelete(req.params.id)
        res.send("Post deleted successfully")
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

// add a like
const addLike = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        post.likes.push(req.session.name)
        await post.save()
        res.send("Like added successfully")
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

// add a comment
const addComment = async (req, res) => {
    try{
        const post = await postModel.findById(req.params.id)
        post.comments.push(req.body.comment)
        await post.save()
        res.send("Comment added Successfully")
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }

}

module.exports = {
    getPost,
    getOne,
    createPost,
    editPost,
    deletePost,
    addLike, 
    addComment
}