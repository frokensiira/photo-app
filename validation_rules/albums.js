/**
 * Album Validation Rules
 */

const models = require('../models');
const { body } = require('express-validator');

const createRules = [
    body('title').isLength({ min: 2}).custom(async value => {
        const album = await new models.Album({ title: value }).fetch({ require: false});
        if(album){
            return Promise.reject('Album title already exists.');
        }
        return Promise.resolve();
    }),
    body('user_id').isNumeric(),
];

const storePhotosRules = [
    body('photo_ids').isArray()
];
/* const updateRules = [
    body('password').optional().isLength({ min: 3}),
    body('first_name').optional().isLength({ min: 2}),
    body('last_name').optional().isLength({ min: 2}),
]; */

module.exports = {
    createRules,
    storePhotosRules,
    //updateRules,
}