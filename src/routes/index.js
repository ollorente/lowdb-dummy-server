const api = require('express').Router()

api.route('/')
    .get((req, res) => {
        res.status(200).json({ message: `¡Hola, mundo!` })
    })

api.route('*')
    .get((req, res, next) => {
        res.status(404).json({
            error: `Page don't found! :(`
        })
    })

module.exports = api