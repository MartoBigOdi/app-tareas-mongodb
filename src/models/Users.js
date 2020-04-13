const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {type: String, required:true},
    password:{type: String, required:true},
    fullname:{type: String, required:true},
    cargo:{type: String, required:true},
    tiempoDeCreación:{type: Date, default: Date.now}
});

module.exports = mongoose.model('Users', UserSchema);