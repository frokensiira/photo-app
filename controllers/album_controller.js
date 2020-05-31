/**
 * Album Controller
 */


const models = require('../models');
const { validationResult, matchedData } = require('express-validator');

/**
 * Get all albums
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

	await req.user.load('albums')
	const albums = req.user.related('albums');

	res.send({
		status: 'success',
		data: {
			albums
		}
	});

}

/**
 * Get a specific album
 *
 * GET /:albumId
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
		// fetch the requested album from the database
		const album = await new models.Album({
            id: req.params.albumId,
            user_id: req.user.id,
		}).fetch({ withRelated: 'photos', require: false });
		
		//check if the user owns this album, if not bail
		if(!album){
			return res.status(401).send({
				status: 'fail',
				data: "You don't have access to this album",
			});
		}

		// if it belongs to the user, display it
		res.send({
			status: 'success',
			data: {
				album
			}
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested album",
		});
	}
}

/**
 * Store a new album
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
		console.log('Create album request failed validation', errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}

	const validData = matchedData(req);

	console.log('validData is', validData);

	validData.user_id = req.user.id;

	try{
		const album = await models.Album.forge(validData).save();

		res.send({
			status: 'success',
			data: {
				album,
			}
		});
	} catch (error) {
		res.status(500).send({
			status: error,
			message: 'Error when creating a new album',
		})
		throw error;
	}
}

/**
 * Store photos in a specific album
 *
 * POST /
 */
const storePhotos = async (req, res) => {

	//check if user is logged in
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	// check that all data passed the validation rules
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}

	// extract the valid data
	const validData = matchedData(req);
	// Make sure there are no duplicates of photo id:s sent from the user
	const uniquePhotos = [...new Set(validData.photo_ids)];

	// get the album id
	const album_id = Number(req.params.albumId);

	try {

		// fetch the requested album from the database
		const album = await new models.Album({
            id: req.params.albumId,
            user_id: req.user.id,
		}).fetch({ withRelated: 'photos', require: false });

		// check if the user owns this album, if not bail
		if(!album){
			res.status(401).send({
				status: 'fail',
				data: "You don't have access to this album",
			});
		}

		// Make sure that any of the photos doesn't already exist in the album

		// extract the photo ids from the album
		const photoIds = album.relations.photos.models.map(photo => {
			return photo.id;
		});

		// check if any of the photos already exists in the album, if so let the user know
		const duplicates = photoIds.filter(id => uniquePhotos.indexOf(id) != -1);

		if(duplicates.length !== 0) {
			res.status(409).send({
				status: 'fail',
				data: `Photo with id ${duplicates} already exists in this album. Please remove those id:s and try again`,
			});
		}

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested album",
		});
	}

	try {

		// Check if the owner owns the photos

		// get all the photos that the user owns from the db
		await req.user.load('photos')
		const photos = req.user.related('photos');

		// extract only the id:s of the photos that the user owns
		const photoArrayDb = photos.models.map( photo => {
			return photo.id;
		});

		// check if the owners owns the photos, otherwise bail
		const difference = uniquePhotos.filter(id => !photoArrayDb.includes(id));

		if(difference.length !== 0){
			return res.status(401).send({
				status: 'fail',
				data: `You don't have access to photo with id: ${difference}`,
			});
		}
		
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photo",
		});
	}

	// Now that we have checked that all the data is fine, send to db
	try{

		// create an array of objects to send to db
		const new_photos = uniquePhotos.map(photo_id => {
			return {
				album_id,
				photo_id
			}
		});
	
		// send each object to db 
		const data = await Promise.all(new_photos.map(async photo => {
			return await models.Albums_Photos.forge(photo).save();
		}))
		 
		res.send({
			status: 'success',
			data: {
				data
			}
		});
		
	} catch (error) {
		res.status(500).send({
			status: error,
			message: 'Error when storing photos in this album',
		})
		throw error;
	}
}

/**
 * Update a specific album
 *
 * POST /:albumId
 */
const update = (req, res) => {
	res.status(405).send({
		status: 'fail',
		data: 'Updating an album is not yet implemented.',
	});
}

/**
 * Destroy a specific album
 *
 * DELETE /:albumId
 */
const destroy = async (req, res) => {

	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	try {
		// get the album from the db
		const album = await new models.Album({
            id: req.params.albumId,
            user_id: req.user.id,
		}).fetch({ withRelated: 'photos', require: false });

		console.log('this is album', album);
		
		// check if the album belongs to the user
		if(!album){
			return res.status(401).send({
				status: 'fail',
				data: "You don't have access to this album",
			});
		}

		// Now that we know that the album belongs to the user, we can delete it

		// delete album from database and detach it from all photos
		album.destroy().then();
		album.photos().detach();

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
	storePhotos,
	update,
	destroy,
}