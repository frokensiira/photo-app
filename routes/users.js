/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('./../controllers/author_controller')

/* Get all resources */
router.get('/', index);

/* Get a specific resource */
router.get('/:userId', show);

/* Store a new resource */
router.post('/', store);

/* Update a specific resource */
router.put('/:userId', update);

/* Destroy a specific resource */
router.delete('/:userId', destroy);

module.exports = router;
