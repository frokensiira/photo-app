const express = require('express');
const router = express.Router();

const { basic, validateJwToken } = require('../controllers/middlewares/auth')

/* GET / */
router.get('/', (req, res) => {
	res.send({ status: 'success' });
});

router.use('/register', require('./users'));

// add ability to login and get a JWT
router.post('/login', require('../controllers/login_controller'));
//router.post('/login', [basic], require('../controllers/login_controller'));

// add ability to validate a JWT


//router.use(basic);
router.use(validateJwToken);

router.use('/photos', require('./photos'));
router.use('/albums', require('./albums'));


module.exports = router;
