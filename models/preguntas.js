const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PreguntaSchema= Schema({
    factor:{ 
        type:String,
        require:true
    },
    name:{
        type:String,
        unique:true,
        require:true
    },
    createDate:{ 
        type:Date,
        default: Date.now() 
    }
        
})

//PreguntaSchema.index({ factor:1},{collation:{locale:'es',strength:2}})

module.exports = mongoose.model('Pregunta',PreguntaSchema);