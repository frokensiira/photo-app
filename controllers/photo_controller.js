/**
 * Photo Controller
 */

const bcrypt = require('bcrypt');
const models = require('../models');
const { validationResult, matchedData } = require('express-validator');
const knex = require('../models/index')

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

	try {

		const photo = await new models.Photo({
            id: req.params.photoId,
            user_id: req.user.id,
		}).fetch({ withRelated: 'albums', require: false });
		
		if(!photo){
			return res.status(401).send({
				status: 'fail',
				data: "You don't have access to this photo",
			});
		}

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

	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

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

	validData.user_id = req.user.id;

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
		data: 'Updating a photo is not yet implemented.',
	});
}

/**
 * Destroy a specific photo
 *
 * DELETE /:photoId
 */
const destroy = async ( req, res) => {

	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	try {
		// get the photo from the db
		const photo = await new models.Photo({
            id: req.params.photoId,
            user_id: req.user.id,
		}).fetch({ withRelated: 'albums', require: false });

		console.log('this is photo', photo);
		
		// check if the photo belongs to the user
		if(!photo){
			return res.status(401).send({
				status: 'fail',
				data: "You don't have access to this photo",
			});
		}

		// Now that we know that the photo belongs to the user, we can delete it

		// delete photo from database and detach it from all albums
		photo.destroy().then();
		photo.albums().detach();

		res.send({
			status: 'success',
			data: null
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photo",
		});
	}

}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}