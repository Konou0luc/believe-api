const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function ensureInitialSuperAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const nom = process.env.ADMIN_NAME || 'Super Admin';

  if (!email || !password) {
    // No bootstrap configured
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) return;

  const hash = await bcrypt.hash(password, 12);
  await User.create({ nom, email, motDePasseHash: hash, role: 'superadmin' });
  console.log(`[bootstrap] Superadmin créé: ${email}`);
}

module.exports = { ensureInitialSuperAdmin };


