'use strict'
const Pregunta = require('../models/preguntas');
const User = require('../models/user');
const service = require('../services');

//creamosuna funcion para el registro
function signUp(req, res) {
    //creamos un usuario
    const user = new User({
        email: req.body.email,
        //displayName:req.body.displayName,
        password: req.body.password,
        typeUser: req.body.typeUser
    })
    user.avatar = user.gravatar();

    user.save((err) => {
        //comprobamos si ha ocurrido el error
        if (err) return res.status(500).send({ message: `Error al crear el usuario: ${err}` })
        //de lo contrario si no hubo erro devolvemos la respuesta
        return res.status(200).send({ token: service.createToken(user) })
    })
}

// funcion para autenticacion
function singIn(req, res) {
    //busque por email que se introdusca
    User.findOne({ email: req.body.email }, (err, user) => {
        //si hay error devulve un mensaje con el error
        if (err) return res.status(500).send({ message: `Error al ingresar ${err}` })
        //si no existe mandar mensaje de que no existe
        if (!user) return res.status(404).send({ message: `No existe el usuario ${req.body.email}` })

        return user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(500).send({ msg: `Error al ingresar: ${err}` })
            if (!isMatch) return res.status(404).send({ msg: `Error de contraseña: ${req.body.email}` })
            //de lo contrario si existe entonces se logea, manda un mensaje y el token
            req.user = user
            res.status(200).send({
                user: user.typeUser,                
                id:user._id,
                email:user.email,
                message: 'se ha logeado correctamente',
                token: service.createToken(user)
            })
        });
    }).select('_id email +password typeUser');
}

const updateDatosGenerales = (req, res) => {
    let userId = req.params.userId;
    let update = req.body;
    // User.findByIdAndUpdate
    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) return res.status(500).send({ message: `error de peticion: ${err}` });
        res.status(200).send({ users: userUpdate })
    })
}

const updateDireccionLocal = (req, res) => {
    let userId = req.params.userId;
    let calle = req.body.calle;
    let update = req.body.estado;
    let colinda_Cizquierda = req.body.colinda_Cizquierda;
    let colinda_Cderecha = req.body.colinda_Cderecha;
    let n_Exterior = req.body.n_Exterior;
    let n_Interior = req.body.n_Interior;
    let colonia = req.body.colonia;
    let cp = req.body.cp;
    let t_Casa = req.body.t_Casa;

    User.update({ _id: userId },
        {
            $set: {
                local:
                {
                    estado: update,
                    calle: calle,
                    colinda_Cizquierda: colinda_Cizquierda,
                    colinda_Cderecha: colinda_Cderecha,
                    n_Exterior: n_Exterior,
                    n_Interior: n_Interior,
                    colonia: colonia,
                    cp: cp,
                    t_Casa: t_Casa
                }
            }
        },
        (err, userUpdate) => {
            if (err) return res.status(500).send({ message: `error de peticion: ${err}` });
            res.status(200).send({ users: userUpdate })
        })
}


const updateDireccionForanea = (req, res) => {
    let userId = req.params.userId;
    let calle = req.body.calle;
    let update = req.body.estado;
    let colinda_Cizquierda = req.body.colinda_Cizquierda;
    let colinda_Cderecha = req.body.colinda_Cderecha;
    let n_Exterior = req.body.n_Exterior;
    let n_Interior = req.body.n_Interior;
    let colonia = req.body.colonia;
    let cp = req.body.cp;
    let t_Casa = req.body.t_Casa;

    User.findByIdAndUpdate(userId,
        {
            $set: {
                foraneo: {
                    estado: update,
                    calle: calle,
                    colinda_Cizquierda: colinda_Cizquierda,
                    colinda_Cderecha: colinda_Cderecha,
                    n_Exterior: n_Exterior,
                    n_Interior: n_Interior,
                    colonia: colonia,
                    cp: cp,
                    t_Casa: t_Casa

                }
            }
        },
        (err, userUpdate) => {
            if (err) return res.status(500).send({ message: `error de peticion: ${err}` });
            res.status(200).send({ users: userUpdate })
        })
}




const updateDatosAcademicos = (req, res) => {
    let userId = req.params.userId;
    let semestre = req.body.semestre;
    let turno = req.body.turno;
    let grupo = req.body.grupo;
    let carrera = req.body.carrera;
    let t_baja = req.body.t_baja;
    let matricula = req.body.matricula;
    let i_fecha = req.body.i_fecha;

    User.findByIdAndUpdate(userId,
        {
            $set: {
                datosAcademicos: {
                    semestre: semestre,
                    turno: turno,
                    grupo: grupo,
                    carrera: carrera,
                    t_baja: t_baja,
                    matricula: matricula,
                    i_fecha: i_fecha
                }
            }
        },
        (err, userUpdate) => {
            if (err) return res.status(500).send({ message: `error de peticion: ${err}` });
            res.status(200).send({ users: userUpdate })
        })
}


const getUser = (req, res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({ message: `error de peticion: ${err}` })
        if (!users) return res.status(500).send({ message: `no hay ususrios` })

        res.status(200).send({ users: users })
    })
}


const getTypeUser = (req, res) => {
    let email = req.params.email;
    User.find({
        email: `${email}`
    }, (err, user) => {
        if (err) return res.status(500).send({ message: `error de peticion ${err}` })
        if (!user) return res.status(404).send({ message: ` no hay coincidencias ${err}` })

        res.status(200).send({ user: user })
    })
}

const getUserCountMujerStudent = (req, res) => {
    //se cuentan los usuarios donde el tipo de usuario se igual a estudiante y sexo sea igual a mujer
    User.count({ typeUser: "estudiante", sexo: "Mujer" }, (err, count) => {
        if (err) return res.status(500).send({ message: `error de peticion: ${err}` })
        res.status(200).send({ Numero_de_mujeres: count })
    })
}

const getUserCountHombreStudent = (req, res) => {
    User.count({ typeUser: "estudiante", sexo: "Hombre" }, (err, count) => {
        if (err) return res.status(500).send({ message: `error de peticion: ${err}` })
        res.status(200).send({ Numero_de_hombres: count })
    })
}

const getUserCountStudent = (req, res) => {
    User.count({ typeUser: "estudiante" }, (err, count) => {
        if (err) return res.status(500).send({ message: `error de peticion: ${err}` })
        res.status(200).send({ Numero_de_estudiantes: count })
    })
}

const getUserCountAdministrador = (req, res) => {
    User.count({ typeUser: "administrador" }, (err, count) => {
        if (err) return res.status(500).send({ message: `error de peticion: ${err}` })
        res.status(200).send({ Numero_de_administrador: count })
    })
}
/*
const pushRespuestas = (req,res)=>{

    let userId = req.params.userId;
    let largo = req.body;
   // let len = largo.lenght();
    let pregunta = req.body.pregunta;
    let response = req.body.response;
    User.findByIdAndUpdate(userId,
         {
             $push:{
                 resultados:{
                    pregunta:pregunta,
                    response: response
                 }
             }
         },
          (err, userUpdate) => {
        if (err) return res.status(500).send({ message: `error de peticion: ${err}` });
        res.status(200).send({ users: userUpdate })
    })

}

*/
const getPreguntaByFactor =(req,res)=>{
    let factor = req.params.factor;
    let arregle =[];
    Pregunta.find({
        factor: factor
        //new RegExp(name,'i')
    }).exec((err,preguntas)=>{
        preguntas.forEach((q)=>{
            if(err) return res.status(500).send({message:`error de peticion : ${err}`})
            if(!preguntas) return res.status(404).send({message:`no hay coincidencias`})
            arregle.push(q)           

        })
        res.status(200).send({
            preguntas:arregle
        })
    })
    
    /*,(err,preguntas)=>{
        if(err) return res.status(500).send({message:`error de peticion ${err}`})
        if(!preguntas) return res.status(404).send({message:` no hay coincidencias ${err}`})
        res.status(200).send({pregunta:preguntas})
    })*/
}



module.exports = {
    signUp,
    singIn,
    updateDatosGenerales,
    updateDireccionForanea,
    updateDireccionLocal,
    updateDatosAcademicos,
    getUser,
    getTypeUser,
    getUserCountMujerStudent,
    getUserCountHombreStudent,
    getUserCountStudent,
    getUserCountAdministrador,
  //  pushRespuestas,
    getPreguntaByFactor
}