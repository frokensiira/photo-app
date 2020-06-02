/**
 * Photo Controller
 */

const { User, Photo } = require('../models');
const { validationResult, matchedData } = require('express-validator');

// Validate that the photo exists and that it belongs to the user
const validatePhoto = async (id, user_id, res) => {

	try {
		// fetch the requested photo from the database
		const photo = await Photo.fetchPhotoId(id, {require: false});

		//check if it exists, if not bail
		if(!photo){
			res.status(404).send({
				status: 'fail',
				data: "The requested photo does not exist",
			});
			return;
		}

		// fetch the requested photo from the user's database
		const photoUser = await new Photo({
			id,
			user_id
		}).fetch({ withRelated: 'albums', require: false});

		//check if the user owns this photo, if not bail
		if(!photoUser){
			res.status(401).send({
				status: 'fail',
				data: "You don't have access to this photo",
			});
			return;
		}

		return photoUser;

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photos",
		});
		throw error;
	}
	
}

/**
 * Get all photos
 *
 * GET /
 */
const index = async (req, res) => {

	try{
		// fetch all photos belonging to the user from the database
		const user = await User.fetchUserId(req.user.sub, { withRelated: 'photos'});
		const photos = user.related('photos');

		res.send({
			status: 'success',
			data: {
				photos
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photos",
		});
		throw error;
	}

}

/**
 * Get a specific photo
 *
 * GET /:photoId
 */
const show = async (req, res) => {
	
	try {
		// Validate that everything is fine with the photo that the user wants to get
		const photo = await validatePhoto(req.params.photoId, req.user.sub, res);

		// if it belongs to the user, display it and its related albums
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
		throw error;
	}

}

/**
 * Store a new photo
 *
 * POST /
 */
const store = async (req, res) => {

	// check that all data passed the validation rules
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}

	// get the valid input data
	const validData = matchedData(req);

	// check if photo title already exists in user's database
	try {
		const photo = await new Photo({ title: validData.title, user_id: req.user.sub }).fetch({ require: false});
		if(photo){
			res.status(409).send({
				status: 'fail',
				data: 'Photo title already exists. Please choose another title.'
			});
			return;
		}
		
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photo",
		});
		throw error;
	}

	// attach the user's id to the input data
	validData.user_id = req.user.sub;

	try{
		// store the photo in the db
		const photo = await Photo.forge(validData).save();

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

	try {
		// validate that everything is fine with the photo the user is trying to delete
		const photo = await validatePhoto(req.params.photoId, req.user.sub, res);

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
		throw error;
	}

}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}