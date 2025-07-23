const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware d'authentification local
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.post('/register', async (req, res) => {
  try {
    console.log('Register payload (backend):', req.body); // <-- Ajout debug

    const { username, email, password, birthDate, gender } = req.body;

    if (!username || !email || !password || !birthDate || !gender) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    if (await User.findOne({ $or: [{ email }, { username }] })) {
      return res.status(409).json({ message: 'Email ou nom d\'utilisateur déjà utilisé.' });
    }

    const passwordHash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS) || 12);

    const user = new User({
      username,
      email,
      passwordHash,
      birthDate,
      gender
    });

    await user.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (err) {
    console.error('Erreur register:', err); // <-- Ajout debug
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('Login payload:', req.body); // <-- Ajout debug

    const { username, password } = req.body; // <-- doit être username
    const user = await User.findOne({ username }); // <-- recherche par username
    if (!user)
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        status: user.status
      }
    });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la connexion.', error: err.message });
  }
});

router.put('/user/:id', authenticateToken, async (req, res) => {
  console.log('PUT /user/:id called with id:', req.params.id);
  console.log('ID dans le token JWT:', req.user.id);
  try {
    // Vérifie que l'utilisateur modifie ses propres données
    if (req.user.id !== req.params.id) {
      console.log('ID utilisateur non autorisé:', req.user.id, 'vs', req.params.id);
      return res.status(403).json({ error: 'Accès refusé.' });
    }
    // Champs autorisés à la modification
    const allowedUpdates = ['username', 'email', 'avatar'];
    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Aucune donnée à mettre à jour.' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
    console.log('Résultat de la mise à jour:', updatedUser);
    if (!updatedUser) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Erreur PUT /user/:id:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
