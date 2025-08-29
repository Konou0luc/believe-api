const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    telephone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // ISO date string or formatted per frontend
    heure: { type: String, required: true },
    statut: { type: String, enum: ['en_attente', 'confirmé', 'annulé'], default: 'en_attente' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);


