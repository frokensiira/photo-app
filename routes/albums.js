/**
 * Album Routes
 */

 const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('./../controllers/album_controller');
const { createRules} = require('../validation_rules/albums');

/* Get all resources */
router.get('/', index);

/* Get a specific resource */
router.get('/:albumId', show);

/* Store a new resource */
router.post('/', createRules, store);

/* Update a specific resource */
router.put('/:albumId', update);

/* Destroy a specific resource */
router.delete('/:albumId', destroy);

module.exports = router;