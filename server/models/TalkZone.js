const mongoose = require('mongoose');

const TalkZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la TalkZone est requis'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  category: {
    type: String,
    enum: ['gaming', 'sport', 'cinema', 'musique'],
    required: [true, 'La catégorie est requise']
  },
  description: {
    type: String,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères'],
    trim: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Le créateur est requis']
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Virtual pour compter les membres
TalkZoneSchema.virtual('memberCount').get(function() {
  return this.members ? this.members.length : 0;
});

// Index pour les recherches
TalkZoneSchema.index({ name: 'text', description: 'text', tags: 'text' });
TalkZoneSchema.index({ category: 1 });
TalkZoneSchema.index({ isActive: 1 });
TalkZoneSchema.index({ isFeatured: 1 });

module.exports = mongoose.model('TalkZone', TalkZoneSchema);
