'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const morgan = require('morgan');
//const ProductsCtrl = require('./controllers/product')
const api = require('./routes')

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.text({defaultCharset: 'utf-8'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
*/

//routes***************************************
app.use('/api',api)
module.exports = app;

