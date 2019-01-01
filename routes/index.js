'use strict'
const express = require('express');
const ProductsCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const CarreraCtrl = require('../controllers/carrera');
const auth = require('../middlewares/auth');
const api = express.Router();



api.get('/product', ProductsCtrl.getProduct)
api.get('/product/:productId', ProductsCtrl.getProductId)

//agregamos auth para que solo usuarios autenticados puedan accesar a estas apis
api.post('/product', ProductsCtrl.saveProduct)
api.put('/product/:productId', ProductsCtrl.updateProduct)
api.delete('/product/:productId', ProductsCtrl.deleteProduct)

api.post('/signup', userCtrl.signUp)
api.post('/signin',userCtrl.singIn)

//Carreras
api.post('/carreras',CarreraCtrl.saveCarrera)
api.get('/carreras',CarreraCtrl.getCarreras)
api.get('/carreras/:carreraId', CarreraCtrl.getCarreraid)
api.put('/carreras/:carreraId', CarreraCtrl.updateCarrera)
api.delete('/carreras/:carreraId', CarreraCtrl.deleteCarrera)
//al agregar el auth como parametro, protejemos nuestra ruta
api.get('/private',auth,(req,res)=>{
    res.status(200).send({ message: 'Tienes acceso'})
})
module.exports = api
    /**
     * http://localhost:3000/api/product
     */