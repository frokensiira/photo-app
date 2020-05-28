/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const { store } = require('./../controllers/user_controller');
const { createRules } = require('../validation_rules/user');

/* Register a new user */
router.post('/', createRules, store);

module.exports = router;
