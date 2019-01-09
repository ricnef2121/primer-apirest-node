'use strict'

const User = require('../models/user');
const service=require('../services');

//creamosuna funcion para el registro
function signUp (req,res){
    //creamos un usuario
    const user= new User({
        email: req.body.email,
        //displayName:req.body.displayName,
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
  User.findOne({ email:req.body.email },(err,user)=>{
      //si hay error devulve un mensaje con el error
      if(err) return res.status(500).send({message:`Error al ingresar ${err}`})
      //si no existe mandar mensaje de que no existe
      if(!user) return res.status(404).send({ message:`No existe el usuario ${req.body.email}`})

      return user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
        if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })
  

      //de lo contrario si existe entonces se logea, manda un mensaje y el token
      req.user= user 
      res.status(200).send({
          message: 'se ha logeado correctamente',
          token: service.createToken(user)})
        });

  }).select('_id email +password');

}

const updateDatosGenerales = (req, res) => {
    let userId = req.params.userId;
    let update = req.body;
   // User.findByIdAndUpdate
    User.findByIdAndUpdate(userId,update,(err, userUpdate) =>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`});
        res.status(200).send({users:userUpdate})
    })
}

const updateDireccion = (req, res) => {
    let userId = req.params.userId;
    let update = req.body.estado;
   // User.findByIdAndUpdate
    User.findByIdAndUpdate(userId,{$set:{direccion:{local:{estado:update}}}},(err, userUpdate) =>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`});
        res.status(200).send({users:userUpdate})
    })
    /*
    let userId = req.params.userId;
    let update = req.body.estado;

    User.findByIdAndUpdate({_id:userId},{
        $set:{
            direccion:{local:{
                estado:update
            }}
        }
    },{upsert:true},
    (err,user)=>{
        if(err) return res.status(500).send({message:`error de peticion : ${err}`})
        res.status(200).send({users:user})
    })
*/
}

const getUser = (req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        if(!users) return res.status(500).send({message:`no hay ususrios`})

        res.status(200).send({users:users})
    })
}


module.exports={
    signUp,
    singIn,
    updateDatosGenerales,
    updateDireccion,
    getUser
}