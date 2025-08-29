const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    telephone: { type: String, required: false, trim: true },
    message: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    lu: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);


