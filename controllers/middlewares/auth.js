/**
 * Authenitcation and Authorization
 */

const { User } = require('../../models');

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

module.exports= {
    basic,
}