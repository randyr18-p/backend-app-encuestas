const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_encuesta';


exports.ensureAuth = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'la peticion no tiene la cabecera de autenticacion' });
    }

    let token = req.headers.authorization.replace(/[" "]+/g, '');
    try {
        payload = jwt.decode(token, secret);
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'el token a expirado' });
        }
    } catch (ex) {
        console.log(ex);
        return res.status(404).send({ message: 'el token no es valido' });

    }
    req.user = payload;
    next();
};