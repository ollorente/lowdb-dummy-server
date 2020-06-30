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
    if (infoState) return res.status(500).json({
        error: `Item exist.`
    })

    const data = await getConnection().get('countries').find({
        slug: req.body.countryId
    }).value()

    const newData = {
        _id: v4(),
        code: req.body.code.toUpperCase(),
        countryId: data._id,
        isStatus: req.body.isStatus || true,
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
    const infoCountry = await getConnection().get('countries').find({
        slug: req.params.id
    }).value()
    if (!infoCountry) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('states').filter({
            countryId: infoCountry._id
        }).sortBy('name').value()
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
    const infoState = await getConnection().get('states').find({
        code: req.body.code.toUpperCase()
    }).value()
    if (!infoState) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('states').find({
            slug: infoState.slug
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoState = await getConnection().get('states').find({
        code: req.body.code.toUpperCase()
    }).value()
    if (!infoState) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('states').remove({
            slug: infoState.slug
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

app.identifier = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('states').find({
            _id: req.params.id
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

module.exports = app