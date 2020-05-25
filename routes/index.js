const express = require('express');
const router = express.Router();

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'success' });
});

router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));
//router.use('/users', require('./routes/users'));

module.exports = router;
