'use strict'
const express = require('express');
const ProductsCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const CarreraCtrl = require('../controllers/carrera');
const FactorCtrl = require('../controllers/Factor');
const PreguntaCtrl = require('../controllers/preguntas');
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
api.get('/carreras2/:carreraName',CarreraCtrl.getCarreraName)
api.get('/carreraslike/:name',CarreraCtrl.getCarreraLike)

//Factores
api.post('/factores',FactorCtrl.saveFactor);
api.get('/factores',FactorCtrl.getFactores);
api.get('/factores/:factorId',FactorCtrl.getFactorId);
api.put('/factores/:factorId',FactorCtrl.updateFactor);
api.delete('/factores/:factorId',FactorCtrl.deleteFactor);

//Preguntas
api.post('/preguntas',PreguntaCtrl.savePregunta);
api.get('/preguntas',PreguntaCtrl.getPreguntas);
api.get('/preguntas/:preguntaId',PreguntaCtrl.getPreguntaId);
api.put('/preguntas/:preguntaId',PreguntaCtrl.updatePregunta);
api.delete('/preguntas/:preguntaId',PreguntaCtrl.deletePregunta);
api.get('/preguntasFactor/:preguntaFactor',PreguntaCtrl.getPreguntaFactor);


//al agregar el auth como parametro, protejemos nuestra ruta
api.get('/private',auth,(req,res)=>{
    res.status(200).send({ message: 'Tienes acceso'})
})
module.exports = api
    /**
     * http://localhost:3000/api/product
     */