/**
 * Album Validation Rules
 */

const models = require('../models');
const { body } = require('express-validator');

const storePhotosRules = [
    body('photo_ids').isArray()
];

module.exports = {
    storePhotosRules,
}