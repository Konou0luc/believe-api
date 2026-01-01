const Temoignage = require('../models/Temoignage');

const TemoignagesController = {
  async publicList(req, res, next) {
    try {
      // Chercher les témoignages approuvés (nouveau format) ou validés (ancien format)
      const list = await Temoignage.find({ 
        $or: [{ approuve: true }, { valide: true }] 
      }).sort({ createdAt: -1 });
      res.json(list);
    } catch (err) {
      next(err);
    }
  },
  async list(req, res, next) {
    try {
      // Retourner tous les témoignages pour l'admin (sans filtre)
      const list = await Temoignage.find().sort({ createdAt: -1 });
      res.json(list);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const body = { ...req.body };
      
      // Mapper les anciens champs vers les nouveaux si nécessaire
      if (body.nomClient && !body.nom) {
        body.nom = body.nomClient;
      }
      if (body.message && !body.commentaire) {
        body.commentaire = body.message;
      }
      
      // Nettoyer les anciens champs pour éviter de les sauvegarder
      delete body.nomClient;
      delete body.message;
      
      // En développement, approuver automatiquement les témoignages
      // En production, ils doivent être modérés manuellement
      if (process.env.NODE_ENV === 'development') {
        body.approuve = true;
      }
      
      const created = await Temoignage.create(body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },
  async moderate(req, res, next) {
    try {
      const { id } = req.params;
      const { approuve, valide } = req.body;
      
      // Utiliser approuve en priorité, sinon valide pour compatibilité
      const updateData = approuve !== undefined ? { approuve } : { valide, approuve: valide };
      
      const updated = await Temoignage.findByIdAndUpdate(id, updateData, { new: true });
      if (!updated) return res.status(404).json({ message: 'Témoignage non trouvé' });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Temoignage.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Témoignage non trouvé' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = TemoignagesController;


