const notesCtrl = {};

// Models
const Note = require("../models/Note");
const User = require("../models/User");



//Controllers
notesCtrl.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};




notesCtrl.renderDashboard = async (req, res) => {
  const users =  await User.find();
  console.table(users);
  const tareas = await Note.find().sort({ date: "desc" });
  console.table(tareas);
  res.render("notes/dashboard", {users, tareas});
};





notesCtrl.createDashboard = async (req, res) => {
  const errors = [];
  const { title, descripción, urgencia, idUser} = req.body;

  if (!title) {
    errors.push({ text: "Por Favor pone un Título" });
  }
  if (!descripción) {
    errors.push({ text: "Escribe la descripción" });
  }
  if (!urgencia) {
    errors.push({ text: "Escribe la descripción" });
  }
  if (errors.length > 0) {
    res.render("notes/dashboard", {
      errors,
      title,
      descripción,
      urgencia,
    });
  } else {
    const newNote = new Note({title, descripción, urgencia, idUser});
    await newNote.save();
    req.flash("success_msg", "Nota agregada");
    res.redirect("/notes/dashboard");
  }
};




notesCtrl.createNewNote = async (req, res) => {
  const { title, descripción, urgencia} = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Por Favor pone un Título." });
  }
  if (!descripción) {
    errors.push({ text: "Escribe la descripción" });
  }
  if (!urgencia) {
    errors.push({ text: "Escribe la descripción" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      descripción,
      urgencia
    });
  } else {
    const newNote = new Note({ title, descripción, urgencia });
    newNote.user = req.user.id; 
    await newNote.save();
    req.flash("success_msg", "Nota agregada");
    res.redirect("/notes/all-notes");
  }
};




notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ date: "desc" });
  res.render("notes/all-notes", { notes });
};





notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note.user != req.user.id) {
    req.flash("error_msg", "No se puede");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};





notesCtrl.updateNote = async (req, res) => {
  const { title, descripción, urgencia } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, descripción, urgencia});
  req.flash("success_msg", "Nota actualizada");
  res.redirect("/notes");
};





notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Nota borrada");
  res.redirect("/notes");
};

module.exports = notesCtrl;
