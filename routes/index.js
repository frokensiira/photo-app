const express = require('express');
const router = express.Router();

const { basic } = require('../controllers/middlewares/auth')

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'success' });
});

router.use('/register', require('./users'));

router.use(basic);

router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));


module.exports = router;
