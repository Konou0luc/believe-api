const Reservation = require('../models/Reservation');

const ReservationsController = {
  async create(req, res, next) {
    try {
      const created = await Reservation.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },
  async list(req, res, next) {
    try {
      const reservations = await Reservation.find().sort({ createdAt: -1 });
      res.json(reservations);
    } catch (err) {
      next(err);
    }
  },
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { statut } = req.body;
      const updated = await Reservation.findByIdAndUpdate(id, { statut }, { new: true });
      if (!updated) return res.status(404).json({ message: 'Réservation non trouvée' });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ReservationsController;


