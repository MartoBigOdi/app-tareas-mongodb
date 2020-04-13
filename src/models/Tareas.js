const mongoose = require('mongoose');
const { Schema } = mongoose;

const TareasSchema = new Schema({
    title: {type: String, required: true},
    urgencia: {type: String, required: true},
    descripción:{ type: String, required: true},
    tiempoDeCreación:{type: Date, default: Date.now}
});


module.exports = mongoose.model('Tareas', TareasSchema);