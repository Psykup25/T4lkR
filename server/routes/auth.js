
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// GET /me : renvoie l'utilisateur courant (auth via cookie/JWT)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    // Filtrer les champs sensibles
    const { passwordHash, __v, ...safeUser } = user.toObject();
    res.status(200).json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Changement de mot de passe
router.post('/user/:id/change-password', authenticateToken, async (req, res) => {
  console.log('API POST /user/:id/change-password appelée avec:', req.params, req.body);
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  try {
    // Vérifie que l'utilisateur modifie son propre mot de passe
    if (req.user.id !== id) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    // Vérifie le mot de passe actuel
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe actuel incorrect.' });
    // Met à jour le mot de passe
    user.passwordHash = await bcrypt.hash(newPassword, parseInt(process.env.BCRYPT_ROUNDS) || 12);
    await user.save();
    res.json({ message: 'Mot de passe changé avec succès.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Middleware d'authentification local

// GET user by id (pour profil frontend)
router.get('/user/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ error: 'Accès refusé.' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    const { passwordHash, __v, ...safeUser } = user.toObject();
    res.status(200).json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware d'authentification local
function authenticateToken(req, res, next) {
  // Lire le token depuis le cookie HTTPOnly
  const token = req.cookies?.token;
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

    // Envoyer le token dans un cookie HTTPOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });
    res.json({
      message: 'Connexion réussie',
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
    const allowedUpdates = ['username', 'email', 'avatar', 'location', 'status'];
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
    // Filtrer les champs sensibles
    const { passwordHash, __v, ...safeUser } = updatedUser.toObject();
    res.status(200).json(safeUser);
  } catch (err) {
    console.error('Erreur PUT /user/:id:', err);
    res.status(500).json({ error: err.message });
  }
});

// Route de déconnexion : supprime le cookie JWT
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
  });
  res.json({ message: 'Déconnexion réussie.' });
});

module.exports = router;
