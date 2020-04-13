const { Router } = require('express');
const router = Router();
const { estalogeado, admin } = require('../config/proteccion');
const Tarea = require('../models/Tareas'); 
const Users = require('../models/Users');


//le enviamos la vista.
router.get('/agregar', estalogeado, (req, res) => {
    res.render('seguimiento/agregar');
});

//Acá mandamos los datos de la tarea a agregar al usuario que la esta haciendo.
router.post('/agregar', estalogeado, async (req, res) => {
    const { title, urgencia, descripción } = req.body;
    const nuevaTarea = new Tarea ({ //Acá instanciamos el model de la base con cada tarea nueva y le asignamos un user. 
        title,
        urgencia,
        descripción,
        user: req.user.id
    });
    const errors = []; //Desde acá validamos si los datos estan. Para poder seguir con el proceso.
    if (!title) {
      errors.push({ text: "Por favor ingrese el Título" });
    }
    if (!description) {
      errors.push({ text: "Por favor ingrese descripción" });
    }
    if (!urgencia) {
        errors.push({ text: "Por favor ingrese la urgencia" });
      }
    if (errors.length > 0) {
      res.render("seguimiento/list", {
        errors,
        title,
        description,
        urgencia
      });
    } else {
      await nuevaTarea.save();
        req.flash('ok', 'Tarea Guardada correctamente');
        res.redirect('/seguimiento');
    }
});


//Cuando nos manden a esta dirección con el id especificado lo manejamos con un DELETE.
router.get('/delete/:id', async (req, res) => {
    const { id } = req.params; 

    await Tarea.deleteById(id);
    req.flash('borrada', 'Tarea Terminada');
    res.redirect('/seguimiento');   
});

//Ruta Para agregar Tareas a los users desde un dashboard
router.get('/dashboard', admin, async (req, res) => {

  const tablaTareas = await Tarea.find();
  console.table(tablaTareas);

  const users = await Users.find();
  console.table(users);
  res.render('seguimiento/dashboard', {tablaTareas, users});

});

//En esta Ruta pasamos los datos tomados a la Base de Datos.
router.post('/dashboard', estalogeado , async (req, res) => {
    const { title, urgencia, descripción } = req.body;
    const nuevaTarea = new Tarea ({ //Acá instanciamos el model de la base con cada tarea nueva y le asignamos un user. 
        title,
        urgencia,
        descripción,
        user: req.user.id
    });
    const errors = []; //Desde acá validamos si los datos estan. Para poder seguir con el proceso.
    if (!title) {
        errors.push({ text: "Por favor ingrese el Título" });
      }
      if (!description) {
        errors.push({ text: "Por favor ingrese descripción" });
      }
      if (!urgencia) {
          errors.push({ text: "Por favor ingrese la urgencia" });
      }
    if (errors.length > 0) {
      res.render("seguimiento/dashboard", {
        errors,
        title,
        description,
        urgencia
      });
    } else {
      await nuevaTarea.save();
        req.flash('ok', 'Tarea Guardada correctamente');
        res.redirect('/dashboard');
    }
    res.redirect('/dashboard');
});


module.exports = router;