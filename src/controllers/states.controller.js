const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    const infoState = await getConnection().get('states').find({
        code: req.body.code.toUpperCase()
    }).value()
    if (infoState) return res.status(500).json({ error: `Item exist.` })

    const data = await getConnection().get('countries').find({
        slug: req.body.countryId
    }).value()

    const newData = {
        _id: v4(),
        code: req.body.code.toUpperCase(),
        countryId: data._id,
        isStatus: req.body.isStatus,
        name: req.body.name
    }

    let result
    try {
        result = await getConnection().get('states').push(newData).write()
    } catch (error) {
        return next(error)
    }

    res.status(201).json(result)
}

app.list = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('states').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('states').find({
            code: req.params.id.toUpperCase()
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('states').find({
            slug: req.params.id.toUpperCase()
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('states').remove({
            slug: req.params.id.toUpperCase()
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app