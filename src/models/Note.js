const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {type: String, required: true},
    descripción: {type: String, required: true},
    urgencia: {type: String, required: true},
    date: { type: Date, default: Date.now } 
  },  
    {
      timestamps: true
    }
);

module.exports = model("Note", NoteSchema);
