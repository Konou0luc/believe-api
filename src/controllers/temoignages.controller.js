const Temoignage = require('../models/Temoignage');

const TemoignagesController = {
  async publicList(req, res, next) {
    try {
      const list = await Temoignage.find({ valide: true }).sort({ createdAt: -1 });
      res.json(list);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const created = await Temoignage.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },
  async moderate(req, res, next) {
    try {
      const { id } = req.params;
      const { valide } = req.body;
      const updated = await Temoignage.findByIdAndUpdate(id, { valide }, { new: true });
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


