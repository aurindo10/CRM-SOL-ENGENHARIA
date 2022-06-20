const mongoose = require('mongoose');
const userPerfil = require('./User')

const taskSchema = new mongoose.Schema({
  title : String,
  description: { type: String },
    completed: {
      status: {
        type: String,
        default: 'pending'
      }},
  createdAt: {type: Date, default: Date.now},
  previousTaskState: String
})

const perfilschema = new mongoose.Schema({
    name: String,
    cidade: String,
    date: Date,
    vendedor: String,
    tasks: [taskSchema]
  
  });


  

module.exports = mongoose.model('Perfil', perfilschema);
