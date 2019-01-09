'use strict'
//const colors = require('colors');
const mongoose = require('mongoose');
const app = require('./app')

//settigns*************************************
const config = require('./config')
mongoose.set('useCreateIndex', true)
//conexion a mongodb
mongoose.connect(config.db, {useNewUrlParser: true},  (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conectados Jalando sin pedos');

    //listening**************************************
    app.listen(config.port, () => {
        console.log(`server on ${config.port}`);
    });
})