const Category = require('../models/Category');

const CategoriesController = {
  async list(req, res, next) {
    try {
      const categories = await Category.find().sort({ nom: 1 });
      res.json(categories);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      const created = await Category.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'Cette catégorie existe déjà' });
      }
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await Category.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Catégorie non trouvée' });
      res.json(updated);
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({ message: 'Cette catégorie existe déjà' });
      }
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      // Vérifier si des services utilisent cette catégorie
      const Service = require('../models/Service');
      const servicesCount = await Service.countDocuments({ categorie: id });
      if (servicesCount > 0) {
        return res.status(400).json({ 
          message: `Impossible de supprimer cette catégorie car ${servicesCount} service(s) l'utilise(nt)` 
        });
      }
      const deleted = await Category.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ message: 'Catégorie non trouvée' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = CategoriesController;

