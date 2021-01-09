 const User = require('../models/user');
 const bcrypt = require('bcrypt-nodejs');
 const user = require('../models/user');
 const jwt = require('../service/jwt');

 function pruebas(req, res) {

     res.status(200).send({

         message: 'probando controlador de usuario de mongodb'

     });

 }

 function saveUser(req, res) {

     let user = new User();

     let params = req.body;

     console.log(params);

     user.first_name = params.first_name;
     user.last_name = params.last_name;
     user.username = params.username;
     user.email = params.email;
     user.password = params.password;
     user.is_active = params.is_active;

     if (params.password) {
         bcrypt.hash(params.password, null, null, function(err, hash) {
             user.password = hash;
             if (user.first_name != null && user.last_name != null && user.username != null && user.email != null) {

                 user.save((err, userStored) => {

                     if (err) {
                         res.status(500).send({ message: 'error al guardar el usuario' });
                     } else {
                         if (!userStored) {
                             res.status(404).send({ message: 'no se ha registrado el usuario' });
                         } else {
                             res.status(200).send({ user: userStored });
                         }
                     }
                 });

             } else {
                 res.status(200).send({ message: 'rellena todos los campos' });
             }
         });
         //encriptar contraseña y guardar datos
     } else {
         res.status(200).send({ message: 'introduce la contraseña' });
     }

 }

 function loginUser(req, res) {
     let params = req.body;
     let email = params.email;
     let password = params.password;

     user.findOne({ email: email.toLowerCase() }, (err, user) => {
         if (err) {
             res.status(500).send({ message: 'error en la peticion' });
         } else {
             if (!user) {
                 res.status(404).send({ message: 'el usuario no existe' });
             } else {
                 bcrypt.compare(password, user.password, function(err, check) {
                     if (check) {

                         if (params.gethash) {

                             res.status(200).send({
                                 token: jwt.createToken(user)
                             });

                         } else {
                             res.status(200).send({ user });
                         }
                     } else {
                         res.status(404).send({ message: 'el usuario no ha podido loguearse' });
                     }
                 });
             }
         }
     });
 }

 module.exports = {
     pruebas,
     saveUser,
     loginUser
 };