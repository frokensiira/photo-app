/**
 * Album Validation Rules
 */

const { User } = require('../models');
const { body } = require('express-validator');

const createRules = [
    
    body('email').isEmail().trim().isLength({ min: 6}).custom(async value => {

        //check if email already exists in database
        const email = await new User({ email: value }).fetch({ require: false});
        if(email){
            return Promise.reject('Email already exists.');
        }
        return Promise.resolve();
    }),
    body('password').isString().trim().isLength({ min: 3}),
    body('first_name').isString().trim().isLength({ min: 2}),
    body('last_name').isString().trim().isLength({ min: 2}),
];

module.exports = {
    createRules,
}