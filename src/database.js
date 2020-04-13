const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tareas-seguimiento', {
    useNewUrlParser: true, useNewUrlParser:true, useFindAndModify: false, useUnifiedTopology: true
})
    .then (db => console.log('DB is Connected'.random, 'DB is Connected ----> Mis N Letras'.length, 'DB is Connected'.yellow, 'DB is Connected'.magenta , 'DB is Connected'.trap.yellow))
    .catch(err => consolelog(err));


