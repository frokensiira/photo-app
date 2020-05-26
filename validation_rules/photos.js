/**
 * Photo Validation Rules
 */

const models = require('../models');
const { body } = require('express-validator');

const createRules = [
    body('title').isLength({ min: 2}).custom(async value => {
        const photo = await new models.Photo({ title: value }).fetch({ require: false});
        if(photo){
            return Promise.reject('Photo title already exists.');
        }
        return Promise.resolve();
    }),
    body('url').isLength({ min: 3}),
    body('comment').optional().isLength({ min: 2}),
    body('user_id').isNumeric(),
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