'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const ResultadosSchema = new Schema({
    pregunta : String,
    response : { 
        type : String,
        default:false,
        enum:[
            true,
            false
        ]}
})


const DatosAcademicosSchema = new Schema({
    semestre: String,
    turno: String,
    grupo: String,
    carrera: String,
    t_baja: String,
    matricula: String,
    i_fecha : String
})

const DireccionLocalSchema = new Schema({
    calle: String,
    estado: String,
    colinda_Cizquierda: String,
    colinda_Cderecha: String,
    n_Exterior:String,
    n_Interior:String,
    colonia:String,
    cp:Number,
    t_Casa:String

})


const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    displayName: String,
    avatar: String,
    password: { type: String, select: false },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date,
    typeUser: { type: String,
                default: 'estudiante',
                enum: ['estudiante', 'administrador', 'superadministrador'] },

    p_Nombre: String,
    s_Nombre: String,
    a_Paterno: String,
    a_Materno: String,
    edad: Number,
    telefono: String,
    sexo: { type: String, 
        //enum: ['Hombre', 'Mujer'] 
    },
    residente: { type: String, 
       // enum: ['Local', 'Foraneo'] 
    },

    local: [DireccionLocalSchema],
    foraneo: [DireccionLocalSchema],
    datosAcademicos:[DatosAcademicosSchema],
    resultados:[ResultadosSchema]

})





//Antes de que se guarde el usuario se ejecuta
//la siguiente funcion
UserSchema.pre('save', function (next) {
    let user = this
    //si el usuario no a modificado su contraseña
    //pasa al siguiente midleware
    if (!user.isModified('password')) return next()

    //de lo contrario
    bcrypt.genSalt(10, (err, salt) => {
        //si hay un error pasa al siguiente middleware
        if (err) return next()
        //de lo contrario se hashea la contraseña
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash

            next()

        })
    })
})



//creamos otro metodo con el cula apartir de un email
//nos devuelve un avatar

//usamos la funcion gravatar la cual recibe una funcion
UserSchema.methods.gravatar = function (size) {
    if (!size) {
        size = 200
    }

    //si el usario no ha recibido un email registrador en gravatar
    //se devolvera un avatar por defecto
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    //de lo contrario si esta registrado mandara el avatar registrado
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`

}

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    });
}



module.exports = mongoose.model('User', UserSchema);