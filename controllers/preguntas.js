'use strict'

const Pregunta = require('../models/preguntas');

const savePregunta = (req,res) =>{
    let pregunta = new Pregunta();
    pregunta.factor = req.body.factor;
    pregunta.name = req.body.name;

    pregunta.save((err,datos)=>{
        if(err) res.status(500).send({ message:`error de peticion : ${err}`});

        return res.status(200).send({datos})
    }) 
}

const getPreguntas = (req,res) =>{
    Pregunta.find({},(err,preguntas)=>{
        if(err) return res.status(500).send({ message:`error de peticion: ${err}`});
        if(!preguntas) return res.status(404).send({ message:`no se encontraron concidencias : ${err}`});

        res.status(200).send({ preguntas:preguntas})
    })
}

const getPreguntaId = (req,res)=>{
    let preguntaId = req.params.preguntaId;

    Pregunta.findById(preguntaId,(err,pregunta)=>{
        if(err) return res.status(500).send({message:`error de peticion :${err}`});
        if(!pregunta) return res.status(404).send({message:`no se encontraron coincidencias : ${err}`});

        res.status(200).send({pregunta:pregunta})
    })
}

const updatePregunta = (req,res)=>{
    let preguntaId = req.params.preguntaId;
    let update= req.body;

    Pregunta.findByIdAndUpdate(preguntaId,update,(err,pregunta)=>{
        if(err) return res.status(500).send({ message:`error de peticion : ${err}`});
        res.status(200).send({pregunta:pregunta})
    })
}

const deletePregunta = (req,res)=>{
    let preguntaId = req.params.preguntaId;
    Pregunta.findById(preguntaId,(err,pregunta)=>{
        if(err) return res.status(500).send({message:`error de peticion ${err}`})

        pregunta.remove(err=>{
            if(err) return res.status(500).send({message:`error al borrar la carrera: ${preguntaId}`})
            res.status(200).send({message:`Carrera ${preguntaId} elimida correctamente`})
        }) 
    })
}
/**
 * 
 * const getCarreraName = (req,res) => {
    let carreraName = req.params.carreraName;
    Carrera.find({
        name:`${carreraName}`
    },(err,carrera)=>{
        if(err) return res.status(500).send({message:`error de peticion ${err}`})
        if(!carrera) return res.status(404).send({message:` no hay coincidencias ${err}`})

        res.status(200).send({carrera:carrera})
    })
   } 
 */
const getPreguntaFactor = (req,res) => {
    let preguntaFactor = req.params.preguntaFactor;
    Pregunta.find({
        factor : preguntaFactor
    },(err,pregunta)=>{
        if(err) return res.status(500).send({message:`error de peticion ${err}`})
        if(!pregunta) return res.status(404).send({message:` no hay coincidencias ${err}`})

        res.status(200).send({pregunta:pregunta})
    })
   }


   const getBuscarPregunta=(req,res)=>{
    let name = req.params.name;
    Pregunta.find({
        name: new RegExp(name,'i')
    },(err,preguntas)=>{
        if(err) return res.status(500).send({message:`error de peticion ${err}`})
        if(!preguntas) return res.status(404).send({message:` no hay coincidencias ${err}`})

        res.status(200).send({pregunta:preguntas})
    })
}


module.exports = {
    savePregunta,
    getPreguntas,
    getPreguntaId,
    updatePregunta,
    deletePregunta,
    getPreguntaFactor,
    getBuscarPregunta 
}