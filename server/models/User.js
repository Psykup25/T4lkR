const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom d\'utilisateur est requis'],
    unique: true,
    trim: true,
    minlength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'],
    maxlength: [20, 'Le nom d\'utilisateur ne peut pas dépasser 20 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide']
  },
  passwordHash: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
    maxlength: [100, 'Le mot de passe ne peut pas dépasser 100 caractères'] 
  },
  avatar: {
    type: String,
    default: '👤'
  },
  location: {
    type: String,
    maxlength: [50, 'La localisation ne peut pas dépasser 50 caractères'],
    trim: true
  },
  status: {
    type: String,
    enum: ['En ligne', 'Absent', 'Anonyme'],
    default: 'En ligne'
  },
  birthDate: {
    type: Date,
    required: [true, 'La date de naissance est requise'],
    validate: {
      validator: function(value) {
        const age = new Date().getFullYear() - value.getFullYear();
        return age >= 18 && age <= 100;
      },
      message: 'Vous devez avoir entre 18 et 100 ans'
    }
  },
  gender: {
    type: String,
    enum: ['Homme', 'Femme', 'Autre'],
    required: [true, 'Le genre est requis']
  },
  favoriteTalkzones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TalkZone'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.__v;
      return ret;
    }
  }
});

// Index pour améliorer les performances
UserSchema.index({ status: 1 });

module.exports = mongoose.model('User', UserSchema);
