const moongose = require('mongoose');
const Schema = moongose.Schema;

const FactorSchema = Schema({
    name:{
        type:String,
        unique:true,
        require:true
    },
    createDate:{
        type:Date,
        default:Date.now()
    }
});

module.exports = moongose.model('Factor',FactorSchema);