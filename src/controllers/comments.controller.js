const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    const infoPost = await getConnection().get('posts').find({
        _id: req.params.id
    }).value()
    if (!infoPost) return res.status(500).json({
        error: `Item don't exist.`
    })

    const infoUser = await getConnection().get('users').find({
        uid: req.body.userId
    }).value()
    if (!infoUser) return res.status(500).json({
        error: `Item don´t exist.`
    })

    const newData = {
        _id: v4(),
        userId: infoUser._id,
        postId: infoPost._id,
        comment: req.body.comment,
        createdAt: Date.now()
    }

    let result
    try {
        result = await getConnection().get('comments').push(newData).write()
    } catch (error) {
        return next(error)
    }

    res.status(201).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('comments').find({
            _id: req.params.id
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    const infoComment = await getConnection().get('comments').find({
        _id: req.params.id
    }).value()
    if (!infoComment) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('comments').find({
            _id: infoComment.uid
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoComment = await getConnection().get('comments').find({
        _id: req.params.id
    }).value()
    if (!infoComment) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('comments').remove({
            _id: infoComment._id
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app