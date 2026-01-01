const mongoose = require('mongoose');

const temoignageSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    note: { type: Number, min: 1, max: 5, required: true },
    commentaire: { type: String, required: true, trim: true },
    approuve: { type: Boolean, default: false },
    // Champs de compatibilité pour anciennes données
    nomClient: { type: String, trim: true },
    message: { type: String, trim: true },
    valide: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Temoignage', temoignageSchema);


