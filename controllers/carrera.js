'use strict'
const Carrera = require('../models/carrera');

const saveCarrera = (req,res) => {
    let carrera = new Carrera();
    carrera.name = req.body.name;

    carrera.save((err,datos) =>{
        if(err) return res.status(500).send({ message: `Error al guardar: ${err}` })

        return res.status(200).send({ datos })
    }); 
}

const getCarreras =(req,res) => {
    Carrera.find({},(err,carreras) =>{
        if(err) return res.status(500).send({ message:`Error de peticiond: ${err}` })
        if(!carreras) return res.status(404).send({ message:`No hay carreras que mostrar ${err}` })

        res.status(200).send({ carreras:carreras })
    })
}

const getCarreraid = (req,res) => {
    let carreraId = req.params.carreraId;

    Carrera.findById(carreraId, (err,carrera) => {
        if(err) return res.status(500).send({ message:`error de peticion ${err}` })
        if(!carrera) return res.status(404).send({ message: `no existe es carrera error: ${err}`})

        res.status(200).send({carrera:carrera})
    })
}

const updateCarrera= (req,res) =>{
    let carreraId = req.params.carreraId;
    let update= req.body;

    Carrera.findByIdAndUpdate(carreraId, update,(err, carreraUpdate) => {
        if(err) return res.status(500).send({message: `error de peticion: ${err}`})
        res.status(200).send({ carrera:carreraUpdate})
    })
}

const deleteCarrera = (req,res) =>{
    let carreraId = req.params.carreraId;
    Carrera.findById(carreraId, (err, carrera) =>{
        if(err) return res.status(500).send({ message: `error de peticion: ${err}`})

        carrera.remove(err=>{
            if(err) return res.status(500).send({ message:`error al borrar la carrera ${err}`})
            res.status(200).send({ message: `Carrera eliminada`})
        })
    })
}

const getCarreraName = (req,res) => {
    let carreraName = req.params.carreraName;
    Carrera.find({
        name:`${carreraName}`
    },(err,carrera)=>{
        if(err) return res.status(500).send({message:`error de peticion ${err}`})
        if(!carrera) return res.status(404).send({message:` no hay coincidencias ${err}`})

        res.status(200).send({carrera:carrera})
    })
   }

const getCarreraLike=(req,res)=>{
    let name=req.params.name;
    Carrera.find({
        name: new RegExp(name,'i')
    },(err,carrera)=>{
        if(err) return res.status(500).send({message:`error de peticion ${err}`})
        if(!carrera) return res.status(404).send({message:` no hay coincidencias ${err}`})

        res.status(200).send({carrera:carrera})
    })
}

module.exports = {
    saveCarrera,
    getCarreras,
    getCarreraid,
    updateCarrera,
    deleteCarrera,
    getCarreraName,
    getCarreraLike

}