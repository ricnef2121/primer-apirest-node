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
        { $match: { typeUser: "estudiante",residente:"Local"}},
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


//devuelve todos los municipios de forma separada y cuantos estudiantes peretenecen a ese municipio que sean residentes foraneos
const getUserColoniasForaneo = (req,res) => {
    User.aggregate([
        { $match: {typeUser: "estudiante",residente:"Foraneo"},},
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


////////// Primera Gráfica/////////////////
const getUserResultados = (req,res) => {
    User.aggregate([

        { $unwind: '$resultados' },
        { $project: { resultados: 1, sexo: 1, factor: '$resultados.factor' } },
        {
            $group:{
                _id:{factor:'$resultados.factor', sexo:'$sexo'},                 
                conteo:{$sum:1}
            }
        },

        { $project: { _id: 0, conteo: 1, factor: 1, sexo: 1, factor: '$_id.factor' , sexo:'$_id.sexo' }},


       { 
            $group:{
               _id:{factor:'$factor'}, 
               conteoTotal:{$sum:"$conteo"},  
               datos:{
                $push: {
                  sexo: "$sexo",
                  conteo: "$conteo"
                 
                }             
             }
        }},
      
        { $project: { _id: 0, factor: 1, datos: 1, conteoTotal:1, factor: '$_id.factor'  }},

    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}


//////////////// Segunda Gráfica ////////////////////

const getUserSemestre = (req,res) => {
    User.aggregate([
     
        { $unwind: '$resultados' },
        { $unwind: '$datosAcademicos'},
        { $project: { resultados: 1, datosAcademicos: 1, factor: '$resultados.factor', semestre: '$datosAcademicos.semestre' } },
        
       {
            $group:{
                _id:{semestre: '$datosAcademicos.semestre', factor: '$resultados.factor'},      
                conteo:{$sum:1},           
            }
        },

        { $project: { _id: 0, conteo: 1, factor: 1, semestre: 1, factor: '$_id.factor' , semestre:'$_id.semestre' }},
      
        { 
            $group:{
               _id:{semestre:'$semestre'}, 
               conteoTotal:{$sum:"$conteo"},  
               datos:{
                $push: {
                  factor: "$factor",
                  conteo: "$conteo"
                }             
             }
        }},

      { $project: { _id: 0, semestre: 1, datos: 1, conteoTotal:1, semestre: '$_id.semestre'  }},

    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}


//////////////// Tercera Gráfica ////////////////////

const getUserFactor = (req,res) => {
    let factors = req.params.factors;
    User.aggregate([
        //{$match: {typeUser: "estudiante", factor:factors}},
        { $unwind: '$resultados' },
        
        { $project: { resultados: 1, sexo: 1, factor: '$resultados.factor', pregunta: '$resultado.pregunta' } },
        {$match: { factor:factors}},
      {
            $group:{
                _id:{pregunta: '$resultados.pregunta', factor: '$resultados.factor', sexo: '$sexo'},      
                conteo:{$sum:1},           
            }
        },

    
        { $project: {_id: 1,  conteo: 1, sexo: 1, factor: 1, pregunta: 1, factor: '$_id.factor' , pregunta:'$_id.pregunta',sexo:'$_id.sexo' }},

        { 
            $group:{
               _id:{pregunta:'$pregunta',factor: "$factor"}, 
               conteoTotal:{$sum:"$conteo"},  
               datos:{
                   $push: {
                       //factor: "$factor",
                       sexo: "$sexo",
                       conteo: "$conteo"
                   }  
                }                
             }},
    
    { $project: { _id: 0,
                 factor: 1,
                 pregunta: 1, 
                 datos: 1, 
                 conteoTotal:1,
                 pregunta: '$_id.pregunta', 
                 factor :"$_id.factor" }},
                
    
    { 
        $group:{
           _id:{factor:'$factor'}, 
           // conteoTotal:{$sum:"$conteo"},  
           preguntas:{
               $push: {
                   pregunta: "$pregunta",
                   datos: "$datos",
                   conteoTotal: "$conteoTotal"
               }  
            }                
         }
    },
 
    //{$match: { factor:"Personal"}},

    { $project: { _id: 0,
        factor: 1,
        preguntas: 1,  
        factor :"$_id.factor" }},

    //{$match: {$and : [{typeUser: "estudiante"}, {factor:factors}]}},

    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}



const getUserFecha = (req,res) => {

   /* var moment = new Date();
    var mes1 = moment.getMonth();
    var mes1 = mes1 + 1;
    var year = moment.getFullYear();*/
    let moment = new Date();
    let m = moment.getMonth();
    let y = moment.getFullYear();
    console.log(m,y)
    let mes1 = m+1;
    let year = y;
   console.log(mes1,year)


    User.aggregate([
        { $project: { signupDate: 1, typeUser: 1,mes: { $month: "$signupDate" }, año: { $year: "$signupDate" }}},
  
        {
            $match:{$and : [{typeUser: "estudiante"}, {mes:mes1},{año:year}]}},
        {
            $group:{
                _id:{ dia: { $dayOfMonth: "$signupDate"}, mes: { $month: "$signupDate" }, año: { $year: "$signupDate" }},         
                conteo:{$sum:1}
            }
        },
    ],(err,aggregate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`})
        res.json(aggregate)
    })
}





const getUserFechaByParams = (req,res) => {
    //var moment = new Date();
    //var me = moment.getMonth();
    //console.log(moment);
    //console.log(me);
    var mes1 = req.params.mes;
    var year1 = req.params.year;
    var mes1 = parseInt(mes1)
    var year1 = parseInt(year1)

console.log(mes1,year1)
    //console.log(mes1)
    User.aggregate([
        { $project: { _id:0, signupDate: 1, typeUser: 1,dia:1, mes: 1, año:1, mes: { $month: "$signupDate" }, año: { $year: "$signupDate" },dia:{$dayOfMonth: "$signupDate"}}},
  
       {
            $match:{$and : [{typeUser: "estudiante"}, {mes:mes1},{año:year1}]}},
 //               $and : [
   //             {typeUser: "estudiante"},
     //           $expr : {signupDate:{$month:"$2009-01-01"}
        
        {
            $group:{
                _id:{ dia: {  $dayOfMonth: "$signupDate"}, mes: { $month: "$signupDate" }, año: { $year: "$signupDate" }},         
                conteo:{$sum:1}
            }
        },
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
    getUserYear,
    getUserMonth,
    getUserEdades,
    getUserComparacion,
    getUserDayOfYear,

    getUserResultados,
    getUserSemestre,
    getUserFactor,
    getUserFecha,


    getUserFechaByParams
}