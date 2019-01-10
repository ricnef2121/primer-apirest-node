const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DireccionSchema = new Schema({
    estado: String,
    colonia:String
})

const BookSchema = new Schema({
    title:String,
    pages:Number,
    local:[DireccionSchema]
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