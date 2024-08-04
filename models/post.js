const mongoose = require('mongoose')
const validator = require('validator')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        validate: {
            validator: (value) => {
                return value.length <= 50
            }, message: 'Not more than 50 characters'
        }
    },
    content: {
        type: String,
        validate: {
            validator: (value) => {
                return value.length <= 500
            },
            message: 'Not more than 500 character'
        }
    },
    author: {
        type: String,
        require: true
    },
    authorId: {
        type: String,
        ref: 'user',
        require: true
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    }
})

const postModel = mongoose.model('post', postSchema)
module.exports = postModel