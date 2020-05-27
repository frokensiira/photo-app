/**
 * Photo Validation Rules
 */

const models = require('../models');
const { body } = require('express-validator');

const createRules = [
    body('title').isString().trim().isLength({ min: 2}).custom(async value => {

        //check if photo title already exists in database
        const photo = await new models.Photo({ title: value }).fetch({ require: false});
        if(photo){
            return Promise.reject('Photo title already exists.');
        }
        return Promise.resolve();
    }),
    body('url').isString().trim().isLength({ min: 7}).custom(value => {

        const https = value.slice(0,8);
        const http = value.slice(0,7);

        if(http === 'http://' || https === 'https://'){
            return Promise.resolve();
        }
        return Promise.reject('That is not a valid url.');
    }),
    body('comment').isString().trim().optional().isLength({ min: 2}),
    body('user_id').isNumeric(),
];

module.exports = {
    createRules,
}