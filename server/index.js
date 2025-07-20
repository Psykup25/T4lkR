const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:4200',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connexion MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/t4lkr', {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB connecté');
  } catch (error) {
    console.error('❌ Erreur MongoDB:', error);
    process.exit(1);
  }
};

// Routes de base
app.get('/', (req, res) => {
  res.json({ 
    message: 'T4lkR API Server 🚀',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Test route pour vérifier les modèles
app.get('/api/test', async (req, res) => {
  try {
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    res.json({ 
      message: 'Test réussi',
      userCount,
      models: ['User', 'TalkZone']
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur test', 
      error: error.message 
    });
  }
});

// Gestion des événements MongoDB
mongoose.connection.on('connected', () => {
  console.log('🔗 MongoDB connexion établie');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erreur MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB déconnecté');
});

// Middleware de gestion d'erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err.stack);
  res.status(500).json({ 
    message: 'Erreur serveur interne',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// Middleware pour routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route non trouvée',
    path: req.originalUrl,
    method: req.method
  });
});

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  console.log('\n🛑 Arrêt du serveur...');
  await mongoose.connection.close();
  process.exit(0);
});

// Démarrage du serveur
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur T4lkR démarré sur le port ${PORT}`);
      console.log(`📊 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 API accessible sur: http://localhost:${PORT}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Erreur de démarrage:', error);
    process.exit(1);
  }
};

startServer();
