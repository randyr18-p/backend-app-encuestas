const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT || 27017;

//starting
mongoose.connect('mongodb://localhost:27017/encuestas', (err, res) => {
    if (err) {
        throw err;

    } else {
        console.log('la base  de datos esta corriendo correctamente');
        app.listen(port, () => {
            console.log('servidor del puerto de encuesta escuchando http://localhost:' + port);
        });
    }
});