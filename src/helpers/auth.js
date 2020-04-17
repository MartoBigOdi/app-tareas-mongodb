const helpers = {

    isAuthenticated (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'No tienes los permisos para acceder');
      res.redirect('/notes');
    },

    //Filtro Para la ruta del ADMIN, Solo el req.user.cargo == 'Subgerente Operativo' (O lo que le pasemos por la propiedad del objeto req.) puede acceder.
    admin(req, res, next) {
      if(req.user.cargo == 'Subgerente Operativo' || req.user.cargo == 'Directora' || req.user.cargo == 'Gerente Operativo' || req.user.cargo == 'Coordinador de Datos' || req.user.cargo == 'Director' ) {
          return next();
      }
      return res.redirect('/notes');
    }


};


module.exports = helpers;
