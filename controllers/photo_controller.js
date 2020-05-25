/**
 * Photo Controller
 */


const models = require('../models');

/**
 * Get all resources
 *
 * GET /
 */
const index = async (req, res) => {
	const all_photos = await models.Photo.fetchAll();

	res.send({
		status: 'success',
		data: {
			photos: all_photos
		}
	});
}

/**
 * Get a specific resource
 *
 * GET /:photoId
 */
const show = async (req, res) => {

	const photo = await new models.Photo({ id: req.params.photoId }).fetch();

	res.send({
		status: 'success',
		data: {
			photo,
		}
	});
}

/**
 * Store a new resource
 *
 * POST /
 */
const store = (req, res) => {
/* 	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	}); */
}

/**
 * Update a specific resource
 *
 * POST /:photoId
 */
const update = (req, res) => {
/* 	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	}); */
}

/**
 * Destroy a specific resource
 *
 * DELETE /:photoId
 */
const destroy = (req, res) => {
/* 	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	}); */
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}