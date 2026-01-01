const Service = require('../models/Service');

const ServicesController = {
  async list(req, res, next) {
    try {
      const services = await Service.find().populate('categorie', 'nom description couleur').sort({ createdAt: -1 });
      res.json(services);
    } catch (err) {
      next(err);
    }
  },
  async create(req, res, next) {
    try {
      const created = await Service.create(req.body);
      await created.populate('categorie', 'nom description couleur');
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Service non trouvé' });
      await updated.populate('categorie', 'nom description couleur');
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Service.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Service non trouvé' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ServicesController;


