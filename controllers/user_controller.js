/**
 * User Controller
 */

const bcrypt = require('bcrypt');
const models = require('../models');
const { validationResult, matchedData } = require('express-validator');

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
		validData.password = await bcrypt.hash(validData.password, models.User.hashSaltRounds); 

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
	}

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

module.exports = {
	store,
}