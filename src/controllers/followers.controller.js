const {
	getConnection
} = require('../database')
const {
	v4
} = require('uuid')

const app = {}

app.create = async (req, res, next) => {
	const { uid } = req.headers

	const infoUser = await getConnection().get('users').find({
		uid: uid
	}).value()
	if (!infoUser) return res.status(500).json({
		error: `Item don't exist.`
	})

	const infoPage = await getConnection().get('pages').find({
		slug: req.params.id
	}).value()
	if (!infoPage) return res.status(500).json({
		error: `Item don't exist.`
	})

	const infoFollower = await getConnection().get('followers').filter({
		pageId: infoPage._id,
		userId: infoUser.uid
	}).value()

	if (infoFollower.length > 0) {
		let result
		try {
			result = await getConnection().get('followers').remove({
				pageId: infoPage._id,
				userId: infoUser.uid
			}).write()
		} catch (error) {
			return next(error)
		}

		res.status(204).json(result)
	} else {
		const newData = {
			_id: v4(),
			pageId: infoPage._id,
			userId: infoUser.uid,
			createdAt: Date.now()
		}

		let result
		try {
			result = await getConnection().get('followers').push(newData).write()
		} catch (error) {
			return next({
				error: error.details[0].message
			})
		}

		res.status(201).json(result)
	}
}

app.list = async (req, res, next) => {
	const infoPage = await getConnection().get('pages').find({
		slug: req.params.id
	}).value()
	if (!infoPage) return res.status(500).json({
		error: `Item don't exist.`
	})

	let result
	try {
		result = await getConnection().get('followers').filter({
			pageId: infoPage._id
		}).sortBy('createdAt', 'desc').value()
	} catch (error) {
		return next({
			error: error.details[0].message
		})
	}

	res.status(200).json(result)
}

app.get = async (req, res, next) => {
	const { id } = req.params
	const { uid } = req.headers

	const infoUser = await getConnection().get('users').find({
		uid: uid
	}).value()
	if (!infoUser) return res.status(500).json({
		error: `Item don't exist.`
	})

	const infoPage = await getConnection().get('pages').find({
		slug: id
	}).value()
	if (!infoPage) return res.status(500).json({
		error: `Item don't exist.`
	})

	let result
	try {
		result = await getConnection().get('followers').find({
			userId: infoUser.uid,
			pageId: infoPage._id
		}).value()
	} catch (error) {
		return next({
			error: error.details[0].message
		})
	}

	res.status(200).json(result)
}

module.exports = app