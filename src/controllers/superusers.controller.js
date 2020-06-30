const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    const infoSuperuser = await getConnection().get('superusers').find({
        uid: req.body.uid
    }).value()
    if (infoSuperuser) return res.status(500).json({
        error: `Item exist.`
    })

    if (req.body.email === '' || req.body.uid == '') return res.status(500).json({
        error: `These fields cannot be empty.`
    })

    const newData = {
        _id: v4(),
        displayName: req.body.displayName || '',
        email: req.body.email.toLowerCase(),
        uid: req.body.uid
    }

    let result
    try {
        result = await getConnection().get('superusers').push(newData).write()
    } catch (error) {
        return next(error)
    }

    res.status(201).json(result)
}

app.list = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('superusers').sortBy('displayName').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('superusers').find({
            uid: req.params.id
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    const infoSuperuser = await getConnection().get('superusers').find({
        uid: req.params.id
    }).value()
    if (!infoSuperuser) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('superusers').find({
            uid: infoSuperuser.uid
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoSuperuser = await getConnection().get('superusers').find({
        uid: req.params.id
    }).value()
    if (!infoSuperuser) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('superusers').remove({
            uid: infoSuperuser.uid
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app