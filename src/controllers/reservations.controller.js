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
      
      // Mapper la réponse pour le frontend
      const responseObj = created.toObject();
      // Ajouter typeService pour compatibilité frontend
      if (responseObj.service && !responseObj.typeService) {
        responseObj.typeService = responseObj.service;
      }
      // Normaliser le statut (bien que par défaut ce soit 'en_attente')
      if (responseObj.statut === 'confirmé') {
        responseObj.statut = 'confirme';
      } else if (responseObj.statut === 'annulé') {
        responseObj.statut = 'annule';
      }
      
      res.status(201).json(responseObj);
    } catch (err) {
      next(err);
    }
  },
  async list(req, res, next) {
    try {
      const reservations = await Reservation.find().sort({ createdAt: -1 });
      
      // Mapper les réservations pour ajouter typeService et normaliser les statuts
      const mappedReservations = reservations.map(reservation => {
        const reservationObj = reservation.toObject();
        // Mapper les statuts pour correspondre au format frontend
        if (reservationObj.statut === 'confirmé') {
          reservationObj.statut = 'confirme';
        } else if (reservationObj.statut === 'annulé') {
          reservationObj.statut = 'annule';
        }
        // Ajouter typeService pour compatibilité frontend
        if (reservationObj.service && !reservationObj.typeService) {
          reservationObj.typeService = reservationObj.service;
        }
        return reservationObj;
      });
      
      res.json(mappedReservations);
    } catch (err) {
      next(err);
    }
  },
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      let { statut } = req.body;
      
      // Mapper les valeurs sans accents vers celles avec accents pour correspondre au modèle
      const statutMap = {
        'confirme': 'confirmé',
        'annule': 'annulé',
      };
      
      if (statutMap[statut]) {
        statut = statutMap[statut];
      }
      
      const updated = await Reservation.findByIdAndUpdate(id, { statut }, { new: true });
      if (!updated) return res.status(404).json({ message: 'Réservation non trouvée' });
      
      // Mapper la réponse pour le frontend (sans accents)
      const responseObj = updated.toObject();
      if (responseObj.statut === 'confirmé') {
        responseObj.statut = 'confirme';
      } else if (responseObj.statut === 'annulé') {
        responseObj.statut = 'annule';
      }
      // Ajouter typeService pour compatibilité frontend
      if (responseObj.service && !responseObj.typeService) {
        responseObj.typeService = responseObj.service;
      }
      
      res.json(responseObj);
    } catch (err) {
      next(err);
    }
  },
  async getByEmail(req, res, next) {
    try {
      const { email } = req.params;
      
      if (!email) {
        return res.status(400).json({ message: 'Email requis' });
      }
      
      // Décoder l'email (au cas où il serait encodé)
      let decodedEmail;
      try {
        decodedEmail = decodeURIComponent(email);
      } catch (err) {
        decodedEmail = email; // Si le décodage échoue, utiliser l'email tel quel
      }
      
      // Validation basique de l'email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(decodedEmail)) {
        return res.status(400).json({ message: 'Format d\'email invalide' });
      }
      
      // Normaliser l'email (minuscules, trim)
      const normalizedEmail = decodedEmail.toLowerCase().trim();
      
      const reservations = await Reservation.find({ email: normalizedEmail })
        .sort({ createdAt: -1 });
      
      if (reservations.length === 0) {
        return res.status(404).json({ message: 'Aucune réservation trouvée pour cet email' });
      }
      
      // Mapper les statuts avec accents vers ceux sans accents pour le frontend
      const mappedReservations = reservations.map(reservation => {
        const reservationObj = reservation.toObject();
        // Mapper les statuts pour correspondre au format frontend
        if (reservationObj.statut === 'confirmé') {
          reservationObj.statut = 'confirme';
        } else if (reservationObj.statut === 'annulé') {
          reservationObj.statut = 'annule';
        }
        // Ajouter typeService pour compatibilité frontend
        if (reservationObj.service && !reservationObj.typeService) {
          reservationObj.typeService = reservationObj.service;
        }
        return reservationObj;
      });
      
      res.json(mappedReservations);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ReservationsController;


