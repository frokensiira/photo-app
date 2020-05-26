/**
 * User Controller
 */


const models = require('../models');
const { validationResult, matchedData } = require('express-validator');

/**
 * Get all users
 *
 * GET /
 */
const index = async (req, res) => {
/* 	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	}); */
}

/**
 * Get a specific user
 *
 * GET /:userId
 */
const show = async (req, res) => {
/* 	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	}); */
}

/**
 * Register a new user
 *
 * POST /
 */
const store = async (req, res) => {

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		console.log('Create user request failed validation', errors.array());
		res.status(422).send({
			status: 'fail',
			data: errors.array()
		});
		return;
	}

	const validData = matchedData(req);

	console.log('validData is', validData);

	try{
		const user = await models.User.forge(validData).save();

		res.send({
			status: 'success',
			data: {
				user,
			}
		});
	} catch (error) {
		res.status(500).send({
			status: error,
			message: 'Exception thrown in database when creating a new user',
		})
		throw error;
	}
	
}

/**
 * Update a specific user
 *
 * POST /:userId
 */
const update = (req, res) => {
/* 	res.status(405).send({
		status: 'fail',
		message: 'Updating users is not yet implemented.',
	}); */
}

/**
 * Delete a specific user
 *
 * DELETE /:userId
 */
const destroy = (req, res) => {
/* 	res.status(405).send({
		status: 'fail',
		message: 'Deleting users is not yet implemented.',
	}); */
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}