/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const { index, show, store, update, destroy } = require('./../controllers/user_controller');
const { createRules } = require('../validation_rules/users');

/* Get all users */
//router.get('/', index);

/* Get a specific user */
//router.get('/:userId', show);

/* Register a new user */
router.post('/', createRules, store);

/* Update a specific resource */
//router.put('/:userId', update);

/* Destroy a specific resource */
//router.delete('/:userId', destroy);

module.exports = router;
