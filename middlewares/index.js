isLoggedIn = (req, res, next) => {
    try {
        if (req.session.user) {
            console.log(req.session)
            next();
        }
        else {
            res.status(401).send("login first")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

isOwner = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id)
        if (post.authorId === req.session.user.id) {
            next();
        }
        else {
            res.status(401).send("You are not the owner of this post")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    isLoggedIn,
    isOwner
}