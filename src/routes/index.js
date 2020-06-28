const api = require('express').Router()

const { Country, State, User } = require('../controllers')

api.route('/')
    .get((req, res) => {
        res.status(200).json({ message: `¡Hola, mundo!` })
    })

api.route('/countries')
    .post(Country.create)
    .get(Country.list)

api.route('/countries/:id')
    .get(Country.get)
    .put(Country.update)
    .delete(Country.remove)

api.route('/states')
    .post(State.create)
    .get(State.list)

api.route('/states/:id')
    .get(State.get)
    .put(State.update)
    .delete(State.remove)

api.route('/users')
    .post(User.create)
    .get(User.list)

api.route('/users/:id')
    .get(User.get)
    .put(User.update)
    .delete(User.remove)

api.route('*')
    .get((req, res, next) => {
        res.status(404).json({
            error: `Page don't found! :(`
        })
    })

module.exports = api