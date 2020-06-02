/**
 * Login Controller
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models')

module.exports = async (req, res) => {

    const user = await User.login (req.body.email, req.body.password);

    if(!user) {
        res.status(401).send({
            status: 'fail',
            data: 'Authentication required'
        });
        return;
    }

    // Construct jwt payload
    const payload = {
        sub: user.get('id'),
        email: user.get('email'),
    };

    // Sign payload and get jw-token
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

    res.send({
        status: 'success',
        data: {
            token
        },
    });
}

