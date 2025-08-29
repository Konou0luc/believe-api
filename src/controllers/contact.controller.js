const Contact = require('../models/Contact');

const ContactController = {
  async create(req, res, next) {
    try {
      const created = await Contact.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  },
  async list(req, res, next) {
    try {
      const list = await Contact.find().sort({ createdAt: -1 });
      res.json(list);
    } catch (err) {
      next(err);
    }
  },
  async markRead(req, res, next) {
    try {
      const { id } = req.params;
      const updated = await Contact.findByIdAndUpdate(id, { lu: true }, { new: true });
      if (!updated) return res.status(404).json({ message: 'Message non trouvé' });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ContactController;


