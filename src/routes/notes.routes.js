const express = require("express");
const router = express.Router();

// Controller
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
  renderDashboard,
  createDashboard
} = require("../controllers/notes.controller");

// Helpers
const { isAuthenticated, admin } = require("../helpers/auth");

// New Note
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

router.post("/notes/dashboard", isAuthenticated, admin, createDashboard);

// Get All Notes
router.get("/notes", isAuthenticated, renderNotes);

//Get Dashboard
router.get("/notes/dashboard", isAuthenticated, admin, renderDashboard);

// Edit Notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// Delete Notes
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
