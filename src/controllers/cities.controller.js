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
    if (infoCountry) return res.status(500).json({ error: `Item exist.` })

    const data = await getConnection().get('states').find({
        code: req.body.stateId.toUpperCase()
    }).value()

    const newData = {
        _id: v4(),
        code: req.body.code,
        countryId: data._id,
        isStatus: req.body.isStatus,
        name: req.body.name
    }

    let result
    try {
        result = await getConnection().get('cities').push(newData).write()
    } catch (error) {
        return next(error)
    }

    res.status(201).json(result)
}

app.list = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('cities').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('cities').find({
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
        result = await getConnection().get('cities').find({
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
        result = await getConnection().get('cities').remove({
            slug: req.params.id.toUpperCase()
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app