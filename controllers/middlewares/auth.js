/**
 * Authenitcation and Authorization
 */

const { User } = require('../../models');
const jwt = require('jsonwebtoken');

const basic = async (req, res, next) => {
    console.log("Hello from auth.basic!");

    // Check if Authorization header exists
    if(!req.headers.authorization){
        res.status(401).send({
            status: 'fail',
            data: 'Authorization required',
        });
        return;
    }

    // "Basic bXk6YXNkZg==" => [0] = "Basic", [1] = "bXk6YXNkZg=="
    const [authType, base64Password] = req.headers.authorization.split(' ')

    if(authType.toLowerCase() !== "basic") {
        // not ours to authenticate
        next();
    }

    // Translate username and password from Base64 to a JS-string; email:password
    const decodedPassword = Buffer.from(base64Password, 'base64').toString('ascii');

    // Split email and password
    const [ email, password ] = decodedPassword.split(':');

    const user = await User.login(email, password);

    if(!user){
        res.status(401).send({
            status: 'fail',
            data: 'Authorization failed',
        });
        return;
    }

    // If the user passes the authorization attach the user object to the request 
    req.user = user;

    next();
}

const validateJwToken = async (req, res, next) => {
    //ny kod

	// check that we have authorization header
	if(!req.headers.authorization) {
		res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}
	// check that the Authorization type is Bearer
	const [authType, token] = req.headers.authorization.split(' ');

	if(authType.toLowerCase() !== "bearer") {
        res.status(401).send({
			status: 'fail',
			data: 'Authentication Required.',
		});
		return;
	}
	
	// validate token and extract payload
	let payload = null;
	try {
		payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	} catch (error) {
		res.status(403).send({
			status: 'fail',
			message: "Authentication Failed.",
		});
		throw error;
    }

    // attach payload to req.user
    req.user = payload;

    next();

	
	/*     // retrieve authenticated user's profile
	let user = null;
	try {
		user = await new User({ id: payload.sub }).fetch();
	} catch (error) {
		res.sendStatus(404);
		throw error;
    } */
    
	// send (parts of) profile to requester
/* 	res.send({
		status: 'success',
		data: {
			user: {
				email: user.get('email'),
				first_name: user.get('first_name'),
				last_name: user.get('last_name'),
			},
		}
	}); */
}

	



module.exports= {
    basic,
    validateJwToken,
}