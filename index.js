'use strict'
//const colors = require('colors');
const mongoose = require('mongoose');
const app = require('./app')

//settigns*************************************
const config = require('./config')
//conexion a mongodb
mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conectados');

    //listening**************************************
    app.listen(config.port, () => {
        console.log(`server on ${config.port}`);
    });
})