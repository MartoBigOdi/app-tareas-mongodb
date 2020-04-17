const mongoose = require("mongoose");
const colors = require('colors');

const MONGODB_URI = "mongodb://localhost/tareas-seguimiento";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true, useNewUrlParser:true, useFindAndModify: false, useUnifiedTopology: true 
  })
  .then (db => console.log('DB is Connected'.random, 'DB is Connected ----> Mis N Letras'.length, 'DB is Connected'.yellow, 'DB is Connected'.magenta , 'DB is Connected'.trap.yellow))
  .catch(err => console.log(err));