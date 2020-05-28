/**
 * Photo Controller
 */

const bcrypt = require('bcrypt');
const models = require('../models');
const { validationResult, matchedData } = require('express-validator');

/**
 * Get all photos
 *
 * GET /
 */
const index = async (req, res) => {

	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	await req.user.load('photos')
	const photos = req.user.related('photos');

	res.send({
		status: 'success',
		data: {
			photos
		}
	});

}

/**
 * Get a specific photo
 *
 * GET /:photoId
 */
const show = async (req, res) => {

	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	await req.user.load('photos')
	const photos = req.user.related('photos');
	const photoId = Number(req.params.photoId);
	const photoArray = photos.models;

	const arrayId = photoArray.map( photo => {
		return photo.id;
	});

	try {
		const foundPhoto  = arrayId.find(id => {
				return photoId === id;
		});
	
		if(!foundPhoto){
			return res.status(401).send({
				status: 'fail',
				data: "You don't have access to this photo",
			});
		}
	
		const photo = await new models.Photo({ id: foundPhoto }).fetch();
		res.send({
			status: 'success',
			data: {
				photo
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photo",
		});
	}

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
 * PUT /:photoId
 */
const update = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

/**
 * Destroy a specific photo
 *
 * DELETE /:photoId
 */
const destroy = (req, res) => {
	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	});
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}