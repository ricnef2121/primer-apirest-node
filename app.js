'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const morgan = require('morgan');
//const ProductsCtrl = require('./controllers/product')
const api = require('./routes')

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//routes***************************************
app.use('/api',api)
module.exports = app;

