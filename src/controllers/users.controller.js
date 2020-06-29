const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    const infoEmailUser = await getConnection().get('users').find({
        email: req.body.email
    }).value()
    if (infoEmailUser) return res.status(500).json({
        error: `This email already in use.`
    })

    const infoUidUser = await getConnection().get('users').find({
        uid: req.body.uid
    }).value()
    if (infoUidUser) return res.status(500).json({
        error: `This nickname already in use.`
    })

    if (req.body.email === '' || req.body.uid == '') return res.status(500).json({
        error: `These fields cannot be empty.`
    })

    const newData = {
        _id: v4(),
        displayName: req.body.displayName || '',
        email: req.body.email.toLowerCase(),
        phoneNumber: req.body.phoneNumber || '',
        photoURL: req.body.photoURL || '',
        providerId: req.body.providerId || 'ciudadbusca',
        uid: req.body.uid
    }

    let result
    try {
        result = await getConnection().get('users').push(newData).write()
    } catch (error) {
        return next(error)
    }

    res.status(201).json(result)
}

app.list = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('users').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('users').find({
            uid: req.params.id
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    const infoEmailUser = await getConnection().get('users').find({
        email: req.body.email.toLowerCase()
    }).value()
    if (infoEmailUser) return res.status(500).json({
        error: `This email already in use.`
    })

    const infoUuidUser = await getConnection().get('users').find({
        uid: req.body.uid
    }).value()
    if (infoUuidUser) return res.status(500).json({
        error: `This nickname already in use.`
    })

    let result
    try {
        result = await getConnection().get('users').find({
            uid: req.params.id
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('users').remove({
            uid: req.params.id
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app