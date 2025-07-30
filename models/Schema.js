const mongoose = require('mongoose')
const todoschema = mongoose.Schema({
  text:{
    
    type:String,
    required:true
  }
})
const Schematodo  = mongoose.model('schematodo',todoschema);
module.exports = Schematodo;