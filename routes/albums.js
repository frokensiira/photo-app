/**
 * Album Routes
 */

const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy, storePhotos } = require('./../controllers/album_controller');
const { createRules, storePhotosRules} = require('../validation_rules/album');

/* Get all albums */
router.get('/', index);

/* Get a specific album */
router.get('/:albumId', show);

/* Store photos on a specific album */
router.post('/:albumId/photos', storePhotosRules, storePhotos);

/* Store a new album */
router.post('/', createRules, store);

/* Update a specific album */
router.put('/:albumId', update);

/* Destroy a specific album */
router.delete('/:albumId', destroy);

module.exports = router;