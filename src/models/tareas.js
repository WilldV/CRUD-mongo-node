const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    titulo: {type:String},
    descripcion: {type:String},
    estado: {type: Boolean, default: false}
})

module.exports = mongoose.model('Tareas', taskSchema);