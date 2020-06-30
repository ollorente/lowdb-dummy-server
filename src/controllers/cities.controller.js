const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    const infoCity = await getConnection().get('cities').find({
        code: req.body.code
    }).value()
    if (infoCity) return res.status(500).json({
        error: `Item exist.`
    })

    const data = await getConnection().get('states').find({
        code: req.body.stateId.toUpperCase()
    }).value()

    const newData = {
        _id: v4(),
        code: req.body.code,
        stateId: data._id,
        isStatus: req.body.isStatus || true,
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
    const infoState = await getConnection().get('states').find({
        code: req.params.id.toUpperCase()
    }).value()
    if (!infoState) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('cities').filter({
            stateId: infoState._id
        }).sortBy('name').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('cities').find({
            code: req.params.id.toLowerCase()
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    const infoCity = await getConnection().get('cities').find({
        code: req.params.id.toLowerCase()
    }).value()
    if (!infoCity) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('cities').find({
            code: infoCity.code
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoCity = await getConnection().get('cities').find({
        code: req.params.id.toLowerCase()
    }).value()
    if (!infoCity) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('cities').remove({
            code: infoCity.code
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

module.exports = app