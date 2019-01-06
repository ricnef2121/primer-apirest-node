'use strict'

const Factor = require('../models/factor');

const saveFactor = (req,res) => {
    let factor = new Factor();
    factor.name = req.body.name;
    factor.save((err,datos)=>{
        if(err) return res.status(500).send({ message:`error de peticion: ${err}`});

        return res.status(200).send({datos});
    })
}

const getFactores = (req,res) => {
    Factor.find({},(err,factores) =>{
        if(err) return res.status(500).send({ message:`error de peticion: ${err}`});
        if(!factores) return res.status(404).send({message:`no se encontraron conincidencias error: ${err}`});

        res.status(200).send({ factores:factores})
    })
}

const getFactorId = (req,res)=>{
    let factorId= req.params.factorId;

    Factor.findById(factorId,(err,factor) =>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`});
        if(!factor) return res.status(404).send({ message: `no se encontraron coincidencias erro: ${err}`});

        res.status(200).send({ factor:factor})
    })
}

const updateFactor = (req,res) =>{
    let factorId = req.params.factorId;
    let update = req.body;

    Factor.findByIdAndUpdate(factorId,update,(err, factorUpdate)=>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`});
        res.status(200).send({ factor: factorUpdate })
    })
}

const deleteFactor = (req,res)=>{
    let factorId = req.params.factorId;
    Factor.findById(factorId,(err,factor)=>{
        if(err) return res.status(500).send({ message:`error de peticion: ${err}`});

        factor.remove(err=>{
            if(err) return res.status(500).send({message:`error al borrar la carrera: ${err}`});

            res.status(200).send({message:`Carrera eliminida: ${factorId}`})
        })
    })
}

module.exports = {
    saveFactor,
    getFactores,
    getFactorId,
    updateFactor,
    deleteFactor
}