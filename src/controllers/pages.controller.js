const {
    getConnection
} = require('../database')
const {
    v4
} = require('uuid')
const app = {}

app.create = async (req, res, next) => {
    if (req.body.name === '' || req.body.slug == '' || req.body.userId == '') return res.status(500).json({
        error: `These fields cannot be empty.`
    })

    const infoPage = await getConnection().get('pages').find({
        slug: req.body.slug
    }).value()
    if (infoPage) return res.status(500).json({
        error: `Item exist.`
    })

    const infoCountry = await getConnection().get('countries').find({
        slug: req.body.countryId
    }).value()
    const country = infoCountry ? infoCountry._id : "colombia"

    const infoState = await getConnection().get('states').find({
        code: req.body.stateId.toUpperCase()
    }).value()
    const state = infoState ? infoState._id : ""

    const infoCity = await getConnection().get('cities').find({
        code: req.body.cityId.toLowerCase()
    }).value()
    const city = infoCity ? infoCity._id : ""

    const newData = {
        _id: v4(),
        name: req.body.name,
        slug: req.body.slug.toLowerCase(),
        userId: req.body.userId,
        geo: {
            lat: req.body.geoLat || 4,
            lon: req.body.geoLon || 72
        },
        image: req.body.image,
        description: req.body.description,
        location: req.body.location,
        phone: req.body.phone,
        mobile: req.body.mobile,
        countryId: country,
        stateId: state,
        cityId: city
    }

    let result
    try {
        result = await getConnection().get('pages').push(newData).write()
    } catch (error) {
        return next(error)
    }

    res.status(201).json(result)
}

app.list = async (req, res, next) => {
    const infoPage = await getConnection().get('pages').find({
        slug: req.body.slug
    }).value()
    if (infoPage) return res.status(500).json({
        error: `Item exist.`
    })

    let result
    try {
        result = await getConnection().get('pages').filter({
            slug: infoPage.slug
        }).sortBy('name').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.get = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('pages').find({
            uid: req.params.id
        }).value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.update = async (req, res, next) => {
    const infoPage = await getConnection().get('pages').find({
        uid: req.params.id
    }).value()
    if (!infoPage) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('pages').find({
            uid: infoPage.uid
        }).assign(req.body).write()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

app.remove = async (req, res, next) => {
    const infoPage = await getConnection().get('pages').find({
        uid: req.params.id
    }).value()
    if (!infoPage) return res.status(500).json({
        error: `Item don't exist.`
    })

    let result
    try {
        result = await getConnection().get('pages').remove({
            uid: infoPage.uid
        }).write()
    } catch (error) {
        return next(error)
    }

    res.status(204).json(result)
}

app.all = async (req, res, next) => {
    let result
    try {
        result = await getConnection().get('pages').sortBy('displayName').value()
    } catch (error) {
        return next(error)
    }

    res.status(200).json(result)
}

module.exports = app