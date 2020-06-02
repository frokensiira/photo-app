/**
 * Authenitcation and Authorization
 */

const jwt = require('jsonwebtoken');

const validateJwToken = async (req, res, next) => {

	// Check if authorization header exists
	if(!req.headers.authorization) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
    }
    
	// Check that the Authorization type is Bearer, if not bail
	const [authType, token] = req.headers.authorization.split(' ');

	if(authType.toLowerCase() !== "bearer") {
        res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}
	
	// Validate JW token and extract payload
	let payload = null;
	try {
		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (error) {
		res.status(403).send({
			status: 'fail',
			data: "Authentication Failed.",
		});
		throw error;
    }

    // Now that we have authenticated the user, attach payload to req.user
    req.user = payload;

    next();

}

	



module.exports= {
    //basic,
    validateJwToken,
}