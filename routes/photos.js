/**
 * Photo Routes
 */

const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('../controllers/photo_controller');
const { createRules } = require('../validation_rules/photo');

/* Get all photos */
router.get('/', index);

/* Get a specific photo */
router.get('/:photoId', show);

/* Store a new photo */
router.post('/', createRules, store);

/* Update a specific photo */
router.put('/:photoId', update);

/* Destroy a specific photo */
router.delete('/:photoId', destroy);

module.exports = router;