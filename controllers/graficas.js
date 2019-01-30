'use strict'
//const Pregunta = require('../models/preguntas');
const User = require('../models/user');

//devuelve la cantidad existentes de usuarios del tipo estudiante
//agrupos por sexo y la cantidad que hay de cada grupo
//esta funcion simplifica las siguientes dos
const getSUserCountStudentByGroupSexo = (req,res) => {
    User.aggregate([
        { $match: {typeUser: "estudiante"}},
        { $group:{ _id:'$sexo',conteo:{$sum:1}}
        }
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
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

const getUserColoniasLocal = (req,res) => {
    User.aggregate([
        { $match: { typeUser: "estudiante"}},
        { $group:{ 
                _id:'$local.colonia',                
                conteo:{$sum:1}
                 }
        }
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}


const getUserColoniasForaneo = (req,res) => {
    User.aggregate([
        { $match: {typeUser: "estudiante"}},
        {
            $group:{
                _id:'$foraneo.colonia',         
                conteo:{$sum:1}
            }
        }
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}


const getUserFecha = (req,res) => {
    const current = Date.now();
    
    //console.log('fecha',current)
    User.aggregate([
        {
            $match: {
                typeUser: "estudiante",
                //signupDate : { $month: "$signupDate" }
               // signupDate: new Date(2019, 1, 28)
               ///sexo: "Hombre",
            //signupDate:{"$gte": new Date(2019, 1, 27), "$lt": new Date(2019, 1, 29)}
            },
        
        },
        {            
            $group:{
                _id:{ dia:{$dayOfMonth: "$signupDate"},
                     mes: { $month: "$signupDate" },
                     año: { $year: "$signupDate" }
                    },         
                conteo:{$sum:1},                
            }
        }
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        //res.json(aggregate)
        res.status(200).send({
            data:aggregate
        })
    })
}


const getUserDayOfYear = (req,res) => {
    User.aggregate([
        {
            $group:{
                _id:{ dia: { $dayOfYear: "$signupDate"}},         
                conteo:{$sum:1}
            }
        }
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}


const getUserYear = (req,res) => {
    User.aggregate([
        {
            $group:{
                _id:{ año: { $year: "$signupDate" }},         
                conteo:{$sum:1}
            }
        }
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}

const getUserMonth = (req,res) => {
    User.aggregate([
        {
            $group:{
                _id:{ año: { $year: "$signupDate" }, mes: { $month: "$signupDate" }},         
                conteo:{$sum:1}
            }
        }
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}

const getUserEdades = (req,res) => {
    User.aggregate([
        {
            $match: {
                typeUser: "estudiante"},
            
        },
        {
            $group:{
                _id: {edad:"$edad"},         
                conteo:{$sum:1}
            }
        }
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}

const getUserComparacion = (req,res) => {
    User.find([
        /*{
                año: "estudiante",     
        },*/
        User.aggregate([{
            $group:{
                _id:{ año: { $year: "$signupDate" }},         
                conteo:{$sum:1},
            }
        }])
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}


module.exports = {
    getSUserCountStudentByGroupSexo,
    getUserCountMujerStudent,
    getUserCountHombreStudent,
    getUserCountStudent,
    getUserCountAdministrador,
    getUserColoniasLocal,
    getUserColoniasForaneo,
    getUserFecha,
    getUserYear,
    getUserMonth,
    getUserEdades,
    getUserComparacion,
    getUserDayOfYear
}