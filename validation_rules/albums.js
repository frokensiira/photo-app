/**
 * Album Validation Rules
 */

const models = require('../models');
const { body } = require('express-validator');

const createRules = [
    body('title').isString().trim().isLength({ min: 2}).custom(async value => {

        //check if album title already exists in database
        const album = await new models.Album({ title: value }).fetch({ require: false});
        if(album){
            return Promise.reject('Album title already exists. Please choose another title.');
        }
        return Promise.resolve();
    }),
];

const storePhotosRules = [
    body('photo_ids').isArray()
];

module.exports = {
    createRules,
    storePhotosRules,
}