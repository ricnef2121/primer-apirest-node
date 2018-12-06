'use strict'

const User = require('../models/user');
const service=require('../services');

//creamosuna funcion para el registro
function signUp (req,res){
    //creamos un usuario
    const user= new User({
        email: req.body.email,
        displayName:req.body.displayName,
        password: req.body.password
    })
user.avatar=user.gravatar();

  user.save((err)=>{
      //comprobamos si ha ocurrido el error
      if(err) return res.status(500).send({ message: `Error al crear el usuario: ${err}`})
      //de lo contrario si no hubo erro devolvemos la respuesta
      return res.status(200).send({ token: service.createToken(user) })
  })
}

// funcion para autenticacion
function singIn (req,res){
    //busque por email que se introdusca
  User.find({ email:req.body.email },(err,user)=>{
      //si hay error devulve un mensaje con el error
      if(err) return res.status(500).send({message: err})
      //si no existe mandar mensaje de que no existe
      if(!user) return res.status(404).send({ message: 'No existe el usuario'})

      //de lo contrario si existe entonces se logea, manda un mensaje y el token
      req.user= user 
      res.status(200).send({
          message: 'se ha logeado correctamente',
          token: service.createToken(user)
        })

  })

}

module.exports={
    signUp,
    singIn
}