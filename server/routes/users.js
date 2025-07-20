const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// ...existing code...

router.patch('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { avatar } = req.body;

    // Validation simple
    if (!avatar || typeof avatar !== 'string' || avatar.length > 255) {
      return res.status(400).json({ message: 'Avatar invalide.' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    user.avatar = avatar;
    await user.save();

    // Ne jamais renvoyer tout l'objet Mongoose, seulement les champs utiles
    return res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      status: user.status
    });
  } catch (err) {
    return res.status(400).json({ message: 'Erreur lors de la mise à jour du profil.', error: err.message });
  }
});

module.exports = router;
