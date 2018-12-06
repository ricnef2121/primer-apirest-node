'use strict'

 const services = require('../services')

 function isAuth (req,res,next){
     //compramos si existe una autorizacion para la ruta
     //a la que se trata de acceder
    if(!req.headers.authorization){
        return res.status(403).send({ message: 'No tienes autorizacion para esta ruta'})
    }
    //de lo contrario si existe la autorizacion
    //nos crea un array, separandolo donde encunetre un espacio
    const token = req.headers.authorization.split(' ')[1]
    
    services.decodeToken(token)
    .then(response=>{
        req.user= response 
        next()
    })
    .catch(response=>{
        res.status(response.status)
    })
 }

 module.exports = isAuth;