const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    const infoCountry = await getConnection().get('countries').find({
        slug: req.body.slug
    }).value()
    if (infoCountry) return res.status(500).json({
        error: `Item exist.`
    })

    const newData = {
        _id: v4(),
        code: req.body.code,
        isStatus: req.body.isStatus,
        name: req.body.name,
        slug: req.body.slug
    }

    let result
    try {
        result = await getConnection().get('countries').push(newData).write()
    } catch (error) {
        return next(error)
    }

    res.status(201).json(result)
}

app.list = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('countries').sortBy('name').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('countries').find({
            slug: req.params.id
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    const infoCountry = await getConnection().get('countries').find({
        slug: req.body.slug
    }).value()
    if (!infoCountry) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('countries').find({
            slug: infoCountry.slug
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoCountry = await getConnection().get('countries').find({
        slug: req.body.slug
    }).value()
    if (!infoCountry) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('countries').remove({
            slug: infoCountry.slug
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app