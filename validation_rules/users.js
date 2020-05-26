/**
 * Album Validation Rules
 */

const models = require('../models');
const { body } = require('express-validator');

const createRules = [
    body('email').isLength({ min: 3}).custom(async value => {
        const email = await new models.User({ email: value }).fetch({ require: false});
        if(email){
            return Promise.reject('Email already exists.');
        }

        return Promise.resolve();
    }),
    body('password').isLength({ min: 3}),
    body('first_name').isLength({ min: 2}),
    body('last_name').isLength({ min: 2}),
];

/* const updateRules = [
    body('password').optional().isLength({ min: 3}),
    body('first_name').optional().isLength({ min: 2}),
    body('last_name').optional().isLength({ min: 2}),
]; */

module.exports = {
    createRules,
    //updateRules,
}