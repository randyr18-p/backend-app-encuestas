const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_encuesta';

exports.createToken = function(user) {

    let payload = {

        sub: user._id,
        firstname: user.first_name,
        lastname: user.last_name,
        username: user.username,
        email: user.email,
        password: user.password,
        is_active: user.is_active,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix

    };

    return jwt.encode(payload, secret);
};