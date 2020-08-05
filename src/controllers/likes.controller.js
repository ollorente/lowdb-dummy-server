const {
	getConnection
} = require('../database')
const {
	v4
} = require('uuid')

const app = {}

app.create = async (req, res, next) => {
	const {
		uid
	} = req.headers

	const infoUser = await getConnection().get('users').find({
		uid: uid
	}).value()
	if (!infoUser) return res.status(500).json({
		error: `Item don't exist.`
	})

	const infoPost = await getConnection().get('posts').find({
		_id: req.params.id
	}).value()
	if (!infoPost) return res.status(500).json({
		error: `Item don't exist.`
	})

	const infoLike = await getConnection().get('likes').filter({
		postId: infoPost._id,
		userId: infoUser.uid
	}).value()

	if (infoLike.length > 0) {
		let result
		try {
			result = await getConnection().get('likes').remove({
				userId: infoUser.uid,
				postId: infoPost._id
			}).write()
		} catch (error) {
			return next(error)
		}

		res.status(204).json(result)
	} else {
		const newData = {
			_id: v4(),
			postId: infoPost._id,
			userId: infoUser.uid,
			createdAt: Date.now()
		}

		let result
		try {
			result = await getConnection().get('likes').push(newData).write()
		} catch (error) {
			return next(error)
		}

		res.status(201).json(result)
	}
}

app.list = async (req, res, next) => {
	const { id } = req.params

	let result, count
	try {
		result = await getConnection().get('likes').filter({
			postId: id
		}).sortBy('createdAt', 'desc').value()

		count = await result.length
	} catch (error) {
		return next(error)
	}

	res.status(200).json(result, count)
}

app.get = async (req, res, next) => {
	let result
	try {
		result = await getConnection().get('admins').find({
			uid: req.params.id
		}).value()
	} catch (error) {
		return next(error)
	}

	res.status(200).json(result)
}

module.exports = app