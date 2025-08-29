const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    prix: { type: Number, required: true, min: 0 },
    categorie: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);


