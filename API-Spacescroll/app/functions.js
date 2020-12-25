const jwt = require('jsonwebtoken');
const config = require('./config/config');
module.exports = {
    authenticated: function (req, res, next) {
        console.log('Request Type:', req.method);
        /* if (req.cookies.auth) {
          next();
        } */
        console.log('asd',req.cookies.auth.toSource());

        jwt.verify(req.cookies.auth, config.secret, async function (err, decoded) {
            // err
            // decoded undefined
            if (!err && decoded) {
                next();
            } else {

                res.status('401').json({ message: 'Sorry you are not authenticated :(' });
            }

        });
    }
};