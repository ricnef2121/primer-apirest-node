'use strict'
//const colors = require('colors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = require('./app')
    //settigns*************************************
app.set('port', port);

//conexion a mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shop', (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conectados');

    //listening**************************************
    app.listen(app.get('port'), () => {
        console.log(`server on ${app.get('port')}`);
    });
})