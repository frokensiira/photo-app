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
	update,
	destroy,
}