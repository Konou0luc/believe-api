const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    couleur: { type: String, default: '#ec4899' }, // Couleur par défaut rose
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);

