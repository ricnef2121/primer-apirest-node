'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
const ProductsCtrl = require('./controllers/product')

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//routes***************************************
//traeme los productos
app.get('/api/product', ProductsCtrl.getProduct)
    //traeme un producto en especifico
app.get('/api/product/:productId', ProductsCtrl.getProductId)
    //envia un producto al servidor
app.post('/api/product', ProductsCtrl.saveProduct)
    //actualiza un producto
app.put('/api/product/:productId', ProductsCtrl.updateProduct)
    //elimina un producto
app.delete('/api/product/:productId', ProductsCtrl.deleteProduct)

module.exports = app;