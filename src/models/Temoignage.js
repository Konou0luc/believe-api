const mongoose = require('mongoose');

const temoignageSchema = new mongoose.Schema(
  {
    nomClient: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    note: { type: Number, min: 1, max: 5, required: true },
    valide: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Temoignage', temoignageSchema);


