const Reservation = require('../models/Reservation');
const Temoignage = require('../models/Temoignage');
const Contact = require('../models/Contact');

const DashboardController = {
  async stats(req, res, next) {
    try {
      const [totalReservations, reservationsEnAttente, reservationsConfirmées, reservationsAnnulées, temoignagesEnAttente, temoignagesValidés, messagesNonLus] = await Promise.all([
        Reservation.countDocuments(),
        Reservation.countDocuments({ statut: 'en_attente' }),
        Reservation.countDocuments({ statut: 'confirmé' }),
        Reservation.countDocuments({ statut: 'annulé' }),
        Temoignage.countDocuments({ valide: false }),
        Temoignage.countDocuments({ valide: true }),
        Contact.countDocuments({ lu: false }),
      ]);

      res.json({
        totalReservations,
        reservationsEnAttente,
        reservationsConfirmées,
        reservationsAnnulées,
        temoignagesEnAttente,
        temoignagesValidés,
        messagesNonLus,
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = DashboardController;


