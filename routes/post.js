const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const middleWares = require('../middlewares/index')
const postModel = require('../models/post')
/*
Routes
Get all post(loggedIn)
Get one post(loggedIn)
Edit one post(isOwner)
Delete one post(isOwner)
Add a like(loggedin middleware)
Add a comment (loggedin middleware)
*/

// get all post
// router.get('/', (req, res) => {
//     res.redirect("/posts")
// })

router.get('/posts', middleWares.isLoggedIn ,postController.getPost)

// get one post 
router.get('/posts/:id', middleWares.isLoggedIn, postController.getOne)

// create a post 
router.post('/create', middleWares.isLoggedIn, postController.createPost)

// edit a post
router.put('/post/:id', middleWares.isOwner, postController.editPost)

// delete a post
router.delete('/post/:id', middleWares.isOwner, postController.deletePost)

// add like 
router.post('/post/:id/likes', middleWares.isLoggedIn, postController.addLike)

// add comment
router.post('/post/:id/comment', middleWares.isLoggedIn, postController.addComment)

module.exports = router