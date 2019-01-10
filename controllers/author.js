'use strict';

const Author = require('../models/autor');

const saveAuthor = (req,res) =>{
    let author = new Author({
        name : req.body.name,
        books:[{
            title:req.body.title,
            pages:req.body.pages,
            local:[{
                estado:req.body.estado,
                colonia:req.body.colonia
            }]
        }]
    });
    //author.name = req.body.name;
    author.age = req.body.age;    
    author.save((err,datos)=>{
        if(err) return res.status(500).send({message:`error de peticion : ${err}`})

        return res.status(200).send({datos})
    })

}

const getAuthors =(req,res) => {
    Author.find({},(err,authors) =>{
        if(err) return res.status(500).send({ message:`Error de peticiond: ${err}` })
        if(!authors) return res.status(404).send({ message:`No hay carreras que mostrar ${err}` })

        res.status(200).send({ authors:authors })
    })
}

const updateAuthor = (req, res) => {
    let userId = req.params.userId;
    let update = req.body.title;
   // User.findByIdAndUpdate
 /*   Author.findByIdAndUpdate(userId,{$set:{books:{title:update}}},(err, userUpdate) =>{
        if(err) return res.status(500).send({message:`error de peticion: ${err}`});
        res.status(200).send({authors:userUpdate})
    })
*/
Author.update({_id:userId},
    {$set:{
        books:{title:update}}},
    (err, userUpdate) =>{
    if(err) return res.status(500).send({message:`error de peticion: ${err}`});
    res.status(200).send({authors:userUpdate})
})


}

module.exports = {
    saveAuthor,
    getAuthors,
    updateAuthor
}