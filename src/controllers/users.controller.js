const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    if (req.body.email === '' || req.body.uid == '') return res.status(500).json({
        error: `These fields cannot be empty.`
    })

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

    const newData = {
        _id: v4(),
        displayName: req.body.displayName || '',
        email: req.body.email.toLowerCase(),
        phoneNumber: req.body.phoneNumber || '',
        photoURL: req.body.photoURL || '',
        providerId: req.body.providerId || 'ciudadbusca',
        uid: req.body.uid,
        createdAt: Date.now()
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
        result = await getConnection().get('users').sortBy('displayName').value()
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
    const infoUser = await getConnection().get('users').find({
        uid: req.body.uid
    }).value()
    if (!infoUser) return res.status(500).json({
        error: `Item don't exist.`
    })

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
        error: `Item exist.`
    })

    let result
    try {
        result = await getConnection().get('users').find({
            uid: infoUser.uid
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoUser = await getConnection().get('users').find({
        uid: req.body.uid
    }).value()
    if (!infoUser) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('users').remove({
            uid: infoUser.uid
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app