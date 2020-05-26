const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'success' });
});

router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));
router.use('/register', require('./users'));

module.exports = router;
