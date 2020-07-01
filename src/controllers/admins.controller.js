const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    const infoAdmin = await getConnection().get('admins').find({
        uid: req.body.uid
    }).value()
    if (infoAdmin) return res.status(500).json({
        error: `Item exist.`
    })

    if (req.body.email === '' || req.body.uid == '') return res.status(500).json({
        error: `These fields cannot be empty.`
    })

    const newData = {
        _id: v4(),
        displayName: req.body.displayName || '',
        email: req.body.email.toLowerCase(),
        uid: req.body.uid,
        createdAt: Date.now()
    }

    let result
    try {
        result = await getConnection().get('admins').push(newData).write()
    } catch (error) {
        return next(error)
    }

    res.status(201).json(result)
}

app.list = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('admins').sortBy('displayName').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('admins').find({
            uid: req.params.id
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    const infoAdmin = await getConnection().get('admins').find({
        uid: req.params.id
    }).value()
    if (!infoAdmin) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('admins').find({
            uid: infoAdmin.uid
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoAdmin = await getConnection().get('admins').find({
        uid: req.params.id
    }).value()
    if (!infoAdmin) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('admins').remove({
            uid: infoAdmin.uid
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app