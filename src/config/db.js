const mongoose = require('mongoose');

async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri, {
    autoIndex: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}

module.exports = { connectToDatabase };


