const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    const infoPage = await getConnection().get('pages').find({
        slug: req.params.id
    }).value()
    if (!infoPage) return res.status(500).json({
        error: `Item don't exist.`
    })

    const newData = {
        _id: v4(),
        pageId: infoPage._id,
        content: req.body.content || '',
        image: req.body.image || '',
        video: req.body.video || '',
        share: req.body.share || '',
        status: req.body.status || 'public',
        views: 0,
        createdAt: Date.now()
    }

    let result
    try {
        result = await getConnection().get('posts').push(newData).write()
    } catch (error) {
        return next(error)
    }

    res.status(201).json(result)
}

app.list = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('posts').sortBy('createdAt', 'desc').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('posts').find({
            _id: req.params.id
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    const infoPost = await getConnection().get('posts').find({
        _id: req.params.id
    }).value()
    if (!infoPost) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('posts').find({
            _id: infoPost.uid
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoPost = await getConnection().get('posts').find({
        _id: req.params.id
    }).value()
    if (!infoPost) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('posts').remove({
            _id: infoPost.uid
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

app.comments = async (req, res, next) => {
    const infoPost = await getConnection().get('posts').find({
        _id: req.params.id
    }).value()
    if (!infoPost) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('comments').find({
            postId: req.params.id
        }).sortBy('createdAt', 'desc').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.likes = async (req, res, next) => {
    const infoPost = await getConnection().get('posts').find({
        _id: req.params.id
    }).value()
    if (!infoPost) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('likes').find({
            postId: infoPost._id
        }).sortBy('createdAt', 'desc').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

module.exports = app