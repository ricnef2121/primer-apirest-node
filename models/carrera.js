'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarreraSchema = Schema({
    name: { 
        type:String, 
        unique: true,
        required: true, 
    },
    createDate:{ type:Date,default: Date.now() }
})

module.exports = mongoose.model('Carrera',CarreraSchema);