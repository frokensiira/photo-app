/**
 * Album Validation Rules
 */

const { body } = require('express-validator');

const createRules = [
    body('title').isString().trim().isLength({ min: 2})
];

const storePhotosRules = [
    body('photo_ids').isArray().isLength({ min: 1})
];

module.exports = {
    createRules,
    storePhotosRules,
}