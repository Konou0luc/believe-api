const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signJwt } = require('../utils/jwt');

const AuthController = {
  // POST /api/auth/login
  async login(req, res, next) {
    try {
      const { email, motDePasse } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Identifiants invalides' });
      const match = await bcrypt.compare(motDePasse, user.motDePasseHash);
      if (!match) return res.status(401).json({ message: 'Identifiants invalides' });
      const token = signJwt({ id: user._id, role: user.role, email: user.email });
      return res.json({ token, user: { id: user._id, nom: user.nom, email: user.email, role: user.role } });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/auth/register (superadmin)
  async register(req, res, next) {
    try {
      const { nom, email, motDePasse, role } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });
      const hash = await bcrypt.hash(motDePasse, 12);
      const user = await User.create({ nom, email, motDePasseHash: hash, role: role || 'admin' });
      return res.status(201).json({ id: user._id, nom: user.nom, email: user.email, role: user.role });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/auth/register-initial (premier superadmin, sans auth)
  async registerInitial(req, res, next) {
    try {
      // Vérifier s'il existe déjà un superadmin
      const existingSuperAdmin = await User.findOne({ role: 'superadmin' });
      if (existingSuperAdmin) {
        return res.status(403).json({ message: 'Un superadmin existe déjà. Utilisez /auth/register avec authentification.' });
      }

      const { nom, email, motDePasse } = req.body;
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });
      
      // Forcer le rôle superadmin pour le premier compte
      const hash = await bcrypt.hash(motDePasse, 12);
      const user = await User.create({ nom, email, motDePasseHash: hash, role: 'superadmin' });
      return res.status(201).json({ id: user._id, nom: user.nom, email: user.email, role: user.role });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AuthController;


