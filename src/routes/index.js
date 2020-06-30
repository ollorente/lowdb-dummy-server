const api = require('express').Router()

const {
    Admin,
    City,
    Country,
    State,
    Superuser,
    User
} = require('../controllers')

api.route('/')
    .get((req, res) => {
        res.status(200).json({
            message: `¡Bienvenido al API de pruebas!`
        })
    })

api.route('/admins')
    .post(Admin.create)
    .get(Admin.list)

api.route('/admins/:id')
    .get(Admin.get)
    .put(Admin.update)
    .delete(Admin.remove)

api.route('/cities')
    .post(City.create)

api.route('/cities/:id')
    .get(City.get)
    .put(City.update)
    .delete(City.remove)

api.route('/countries')
    .post(Country.create)
    .get(Country.list)

api.route('/countries/:id')
    .get(Country.get)
    .put(Country.update)
    .delete(Country.remove)

api.route('/countries/:id/states')
    .get(State.list)

api.route('/states')
    .post(State.create)

api.route('/states/:id')
    .get(State.get)
    .put(State.update)
    .delete(State.remove)

api.route('/states/:id/cities')
    .get(City.list)

api.route('/superusers')
    .post(Superuser.create)
    .get(Superuser.list)

api.route('/superusers/:id')
    .get(Superuser.get)
    .put(Superuser.update)
    .delete(Superuser.remove)

api.route('/users')
    .post(User.create)
    .get(User.list)

api.route('/users/:id')
    .get(User.get)
    .put(User.update)
    .delete(User.remove)

api.route('/users/:id/comments')
api.route('/users/:id/likes')
api.route('/users/:id/messages')
api.route('/users/:id/pages')

api.route('*')
    .get((req, res, next) => {
        res.status(404).json({
            error: `Page don't found! :(`
        })
    })

module.exports = api