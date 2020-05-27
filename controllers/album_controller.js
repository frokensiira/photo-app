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
	const all_albums = await models.Album.fetchAll();

	res.send({
		status: 'success',
		data: {
			albums: all_albums
		}
	});
}

/**
 * Get a specific album
 *
 * GET /:albumId
 */
const show = async (req, res) => {

	const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: 'photos'});

	res.send({
		status: 'success',
		data: {
			album,
		}
	});
}

/**
 * Store a new album
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
 * Store a new album
 *
 * POST /
 */
const storePhotos = async (req, res) => {
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

	console.log('album id is', req.params.albumId);
	const album_id = Number(req.params.albumId);
	console.log(typeof album_id);

	

	// Make sure there are no duplicates of photo id:s
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
	}
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