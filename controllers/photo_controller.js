/**
 * Photo Controller
 */


const models = require('../models');
const { validationResult, matchedData } = require('express-validator');

/**
 * Get all photos
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
 * Get a specific photo
 *
 * GET /:photoId
 */
const show = async (req, res) => {

	const photo = await new models.Photo({ id: req.params.photoId }).fetch({ withRelated: 'album'});

	res.send({
		status: 'success',
		data: {
			photo,
		}
	});
}

/**
 * Store a new photo
 *
 * POST /
 */
const store = async (req, res) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		console.log('Create photo request failed validation', errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}

	const validData = matchedData(req);

	console.log('validData is', validData);

	try{
		const photo = await models.Photo.forge(validData).save();

		res.send({
			status: 'success',
			data: {
				photo,
			}
		});
	} catch (error) {
		res.status(500).send({
			status: error,
			message: 'Error when creating a new photo',
		})
		throw error;
	}
}

/**
 * Update a specific photo
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
 * Destroy a specific photo
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