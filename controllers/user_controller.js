/**
 * User Controller
 */


const models = require('../models');

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
const store = (req, res) => {
/* 	res.status(405).send({
		status: 'fail',
		message: 'Method Not Allowed.',
	}); */
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