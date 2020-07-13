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
    if (infoPost) return res.status(500).json({
        error: `Item exist.`
    })

    const newData = {
        _id: v4(),
        userId: req.body.uid,
        postId: req.body.postId,
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

app.list = async (req, res, next) => {
    const infoPost = await getConnection().get('posts').find({
        _id: req.params.id
    }).value()
    if (infoPost) return res.status(500).json({
        error: `Item exist.`
    })

    let result
    try {
        result = await getConnection().get('comments').find({
            uid: req.params.id
        }).sortBy('createdAt', 'desc').take(5).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('comments').find({
            uid: req.params.id
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    const infoAdmin = await getConnection().get('comments').find({
        uid: req.params.id
    }).value()
    if (!infoAdmin) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('comments').find({
            uid: infoAdmin.uid
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoAdmin = await getConnection().get('comments').find({
        uid: req.params.id
    }).value()
    if (!infoAdmin) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('comments').remove({
            uid: infoAdmin.uid
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app