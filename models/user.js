'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({ 
    email: {type: String, unique: true, lowercase: true},
    displayName: String,
    avatar: String,
    password:{type: String, select: false},
    signupDate:{type:Date,default: Date.now()},
    lastLogin: Date,

    p_Nombre:String,
    s_Nombre:String,

    direccion:[{
        local:[{
            estado:String,
            colonia:String
        }],
        foraneo:[{
            estado:String,
            colonia:String
        }]
    }]
})





//Antes de que se guarde el usuario se ejecuta
//la siguiente funcion
UserSchema.pre('save', function(next){
    let user = this
    //si el usuario no a modificado su contraseña
    //pasa al siguiente midleware
    if(!user.isModified('password')) return next()

    //de lo contrario
   bcrypt.genSalt(10, (err, salt)=>{
       //si hay un error pasa al siguiente middleware
       if(err) return next()
    //de lo contrario se hashea la contraseña
       bcrypt.hash(user.password, salt, null, (err,hash)=>{
        if(err) return next(err)

        user.password = hash

        next()

    })
   })
})



//creamos otro metodo con el cula apartir de un email
//nos devuelve un avatar

//usamos la funcion gravatar la cual recibe una funcion
UserSchema.methods.gravatar = function (size) {
if(!size){
    size=200
}

    //si el usario no ha recibido un email registrador en gravatar
    //se devolvera un avatar por defecto
    if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    //de lo contrario si esta registrado mandara el avatar registrado
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`

}

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch)
    });
  }



module.exports = mongoose.model('User',UserSchema);