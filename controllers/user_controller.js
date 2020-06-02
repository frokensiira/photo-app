/**
 * User Controller
 */

const bcrypt = require('bcrypt');
const { User } = require('../models');
const { validationResult, matchedData } = require('express-validator');

/**
 * Register a new user
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

	const validData = matchedData(req);

	try {
		// salt and hash password
		validData.password = await bcrypt.hash(validData.password, User.hashSaltRounds); 

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when hashing the password.',
		});
	}

	try {
		// save the user in db
		const user = await User.forge(validData).save();

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
		});
		throw error;
	}
	
}

module.exports = {
	store,
}