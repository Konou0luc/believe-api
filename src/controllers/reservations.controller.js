const Reservation = require('../models/Reservation');

const ReservationsController = {
  async create(req, res, next) {
    try {
      const body = { ...req.body };
      
      // Mapper typeService vers service si nécessaire
      if (body.typeService && !body.service) {
        body.service = body.typeService;
      }
      // Nettoyer typeService pour éviter de le sauvegarder
      delete body.typeService;
      
      // Si prenom n'est pas fourni, essayer de le déduire du nom complet
      if (!body.prenom && body.nom) {
        const nomParts = body.nom.trim().split(/\s+/).filter(part => part.length > 0);
        if (nomParts.length > 1) {
          // Prendre le dernier mot comme prénom, le reste comme nom
          body.prenom = nomParts.pop();
          body.nom = nomParts.join(' ');
        } else {
          // Si un seul mot, le mettre comme nom et laisser prenom vide
          body.prenom = '';
        }
      } else if (!body.prenom) {
        // S'assurer que prenom existe même si vide
        body.prenom = '';
      }
      
      const created = await Reservation.create(body);
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


