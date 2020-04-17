const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");



usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};




usersCtrl.singup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password, cargo, username } = req.body;
  if (!name) {
    errors.push({ text: "Coloque su nombre completo" });
  }
  if (!email) {
    errors.push({ text: "Coloque su email" });
  }
  if (!cargo) {
    errors.push({ text: "Coloque su cargo" });
  }
  if (!username) {
    errors.push({ text: "Coloque su nombre de usuario" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Password no concuerda." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords debe tener más de 4 letras." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      cargo,
      username,
      confirm_password
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "Este mail ya esta en uso.");
      res.redirect("/users/signup");
    } else {
      // Saving a New User
      const newUser = new User({ name, email, password, cargo, username });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registro Correcto.");
      res.redirect("/users/signin");
    }
  }
};



usersCtrl.renderSigninForm = (req, res) => {
  res.render("users/signin");
};



usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
});



usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Saliste del sistema.");
  res.redirect("/users/signin");
};


module.exports = usersCtrl;