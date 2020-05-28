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

	await req.user.load('albums')
	const albums = req.user.related('albums');
	const albumId = Number(req.params.albumId);
	const albumArray = albums.models;

	const arrayId = albumArray.map( album => {
		return album.id;
	});

	try {
		const foundAlbum  = arrayId.find(id => {
			return albumId === id;
		});
	
		if(!foundAlbum){
			return res.status(401).send({
				status: 'fail',
				data: "You don't have access to this album",
			});
		}
	
		const album = await new models.Album({ id: foundAlbum }).fetch();
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

	//ny kod
	if (!req.user) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}

	// gammal kod
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

	// experimentell kod
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

		// Check if the user owns the album
		await req.user.load('albums')
		const albums = req.user.related('albums');
		
		const albumArray = albums.models;

		//console.log('albumArray is', albumArray);

		const albumArrayId = albumArray.map( album => {
			return album.id;
		});

		console.log('albumArrayId is', albumArrayId);

		const foundAlbum = albumArrayId.find(id => {
			return album_id === id;
		});

		console.log('foundAlbum is', foundAlbum);

		
	
		if(!foundAlbum){
			return res.status(401).send({
				status: 'fail',
				data: "You don't have access to this album",
			});
		}


	
		
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested album",
		});
	}

	try {

		// check if the owner owns the photos
		await req.user.load('photos')
		const photos = req.user.related('photos');

		
		//const photoId = Number(req.params.photoId);
		const photoArray = photos.models;

		//console.log('in second try block, photoArray is', photoArray);

		
		// function to check if all of the photos that the user wants to add to the album is actually owned by the user
		const checker = (array, subArray) => {
			return subArray.every(value => {
				return array.includes(value)
			});
		}

		//let checker = (arr, target) => target.every(v => arr.includes(v));

		// extract only the id:s of the photos that the user owns
		const arrayId = photoArray.map( photo => {
			return photo.id;
		});

		console.log('in second try block, arrayId is', arrayId);

		// call the checker
		const result = checker(arrayId, uniquePhotos);

		console.log('checker is', result);

		if(!result){
			return res.status(401).send({
				status: 'fail',
				data: "You don't have access to this photo",
			});
		}
		
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when finding the requested photo",
		});
	}

/* 	try {
		const albumsWithPhotos = await new models.Album({ id: album_id }).fetch({ withRelated: 'photos' });

		console.log('this is albumsWithPhotos.photos', albumsWithPhotos.photos);

		res.send({
			status: 'success',
			data: {
				data: albumsWithPhotos,
			}
		});

		return;
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: "Error when trying to save photos in an album",
		});
	} */

	// Now that we have checked that all the data is fine, send to db
	try{

		// create an array of objects to send to db
		const new_photos = uniquePhotos.map(photo_id => {
			return {
				album_id,
				photo_id
			}
		});

		//console.log('new_photos is', new_photos);

/* 		res.send({
			status: 'success',
		}); */
	
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















	// gammal kod
/* 	const errors = validationResult(req);
	if(!errors.isEmpty()){
		console.log('Create photo request failed validation', errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}

	const validData = matchedData(req); */

/* 	console.log('album id is', req.params.albumId);
	const album_id = Number(req.params.albumId);
	console.log(typeof album_id); */	

	/* // Make sure there are no duplicates of photo id:s
	const uniquePhotos = [...new Set(validData.photo_ids)];

	const photos = uniquePhotos.map(photo_id => {
		return {
			album_id,
			photo_id
		}
	});

	try{
		
		const data = await Promise.all(photos.map(async photo => {
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
	} */
}

/**
 * Update a specific album
 *
 * POST /:albumId
 */
const update = (req, res) => {
/* 	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	}); */
}

/**
 * Destroy a specific album
 *
 * DELETE /:albumId
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
	storePhotos,
	update,
	destroy,
}