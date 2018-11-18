'use strict'
const express = require('express');
const ProductsCtrl = require('../controllers/product')
const api = express.Router;

app.get('/api/product', ProductsCtrl.getProduct)
app.get('/api/product/:productId', ProductsCtrl.getProductId)
app.post('/api/product', ProductsCtrl.saveProduct)
app.put('/api/product/:productId', ProductsCtrl.updateProduct)
app.delete('/api/product/:productId', ProductsCtrl.deleteProduct)
module.exports = api