const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title:String,
    pages:Number
})


const AuthorSchema = new Schema({
    name:String,
    age:Number,
    books:[BookSchema],

    //child: BookSchema
})

const Author = mongoose.model('author',AuthorSchema);

module.exports = Author;

/**
 * const Local = new Schema({
    estado:String,
    colonia: String
})

const Foraneo = new Schema ({
    estado: String,
    colonia:String
})

const AuthorSchema = new Schema({
    name:String,
    age:Number,
    direccion:[{
        local:[Local],
        foraneo:[Foraneo]

    }]
})
 */