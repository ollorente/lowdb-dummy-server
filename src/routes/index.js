const api = require('express').Router()

const {
	Admin,
	Comment,
	City,
	Country,
	Like,
	Page,
	Post,
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

api.route('/comments/:id')
	.get(Comment.get)
	.put(Comment.update)
	.delete(Comment.remove)

api.route('/cities')
	.post(City.create)

api.route('/cities/:id')
	.get(City.get)
	.put(City.update)
	.delete(City.remove)

api.route('/cities/:id/identifier')
	.get(City.identifier)

api.route('/cities/:id/pages')
	.get(Page.pagesByCity)

api.route('/countries')
	.post(Country.create)
	.get(Country.list)

api.route('/countries/:id')
	.get(Country.get)
	.put(Country.update)
	.delete(Country.remove)

api.route('/countries/:id/identifier')
	.get(Country.identifier)

api.route('/countries/:id/pages')
	.get(Page.pagesByCountry)

api.route('/countries/:id/states')
	.get(State.list)

api.route('/pages')
	.post(Page.create)
	.get(Page.all)

api.route('/pages/:id')
	.get(Page.get)
	.put(Page.update)
	.delete(Page.remove)

api.route('/pages/:id/posts')
	.post(Post.create)
	.get(Page.postsList)

api.route('/pages/:id/id')
	.get(Page.getById)

api.route('/posts')
	.get(Post.list)

api.route('/posts/:id')
	.get(Post.get)
	.put(Post.update)
	.delete(Post.remove)

api.route('/posts/:id/comments')
	.post(Comment.create)
	.get(Post.comments)

api.route('/posts/:id/likes')
	.post(Like.create)
	.get(Post.likes)

api.route('/states')
	.post(State.create)

api.route('/states/:id')
	.get(State.get)
	.put(State.update)
	.delete(State.remove)

api.route('/states/:id/cities')
	.get(City.list)

api.route('/states/:id/identifier')
	.get(State.identifier)

api.route('/states/:id/pages')
	.get(Page.pagesByState)

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
	.get(User.comments)

api.route('/users/:id/id')
	.get(User.getById)

api.route('/users/:id/likes')
api.route('/users/:id/messages')

api.route('/users/:id/pages')
	.get(Page.list)

api.route('*')
	.get((req, res, next) => {
		res.status(404).json({
			error: `Page don't found! :(`
		})
	})

module.exports = api