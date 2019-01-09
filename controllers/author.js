'use strict';

const Author = require('../models/autor');

const saveAuthor = (req,res) =>{
    let author = new Author({
        books:[{title:req.body.title}]
    });
    author.name = req.body.name;
    author.age = req.body.age;
    //author.title = req.body.title;
    //author.books = req.body.title;
   // author.title = req.body.title;
    //author.books[0].title = 'a';
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
    {$push:{books:{title:update}}},
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