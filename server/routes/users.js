const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// ...autres routes...

router.patch('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du profil.', error: err.message });
  }
});

module.exports = router;
