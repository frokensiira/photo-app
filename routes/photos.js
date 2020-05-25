/**
 * Photo Routes
 */

const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/photo_controller');

/* Get all photos */
router.get('/', index);

/* Get a specific photo */
router.get('/:photoId', show);

/* Store a new photo */
//router.post('/', store);

/* Update a specific photo */
//router.put('/:photoId', update);

/* Destroy a specific photo */
//router.delete('/:photoId', destroy);

module.exports = router;