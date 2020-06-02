/**
 * Photo Validation Rules
 */

const { body } = require('express-validator');

const createRules = [
    body('title').isString().trim().isLength({ min: 2}),
    body('url').isString().trim().isLength({ min: 7}).custom(value => {

        const https = value.slice(0,8);
        const http = value.slice(0,7);

        if(http === 'http://' || https === 'https://'){
            return Promise.resolve();
        }
        return Promise.reject('That is not a valid url.');
    }),
    body('comment').isString().trim().optional().isLength({ min: 2}),
];

module.exports = {
    createRules,
}