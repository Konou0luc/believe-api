const jwt = require('jsonwebtoken');

function verifyToken(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  return token;
}

function requireAdmin(req, res, next) {
  try {
    const token = verifyToken(req);
    if (!token) return res.status(401).json({ message: 'Token manquant' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload || (payload.role !== 'admin' && payload.role !== 'superadmin')) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

function requireSuperAdmin(req, res, next) {
  try {
    const token = verifyToken(req);
    if (!token) return res.status(401).json({ message: 'Token manquant' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload || payload.role !== 'superadmin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' });
  }
}

module.exports = { requireAdmin, requireSuperAdmin };


