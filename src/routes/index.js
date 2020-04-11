const { Router } = require('express');
const router = Router();
const { filtroLogeado } = require('../config/proteccion');
 

router.get('/', filtroLogeado , (req,res) => {
    req.logOut();
    res.render('inicio')
});

module.exports = router;
 