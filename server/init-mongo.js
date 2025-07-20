// Script d'initialisation MongoDB
db = db.getSiblingDB('t4lkr');

// Créer un utilisateur pour l'application
db.createUser({
  user: 't4lkr_user',
  pwd: 'app_password_123',
  roles: [
    {
      role: 'readWrite',
      db: 't4lkr'
    }
  ]
});

// Créer des collections de base
db.createCollection('users');
db.createCollection('talkzones');
db.createCollection('messages');

// Insérer quelques TalkZones par défaut
db.talkzones.insertMany([
  {
    name: '#CS2',
    category: 'gaming',
    description: 'Discussions sur Counter-Strike 2',
    isActive: true,
    isFeatured: true,
    tags: ['fps', 'competitive', 'steam'],
    members: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '#FOOTBALL',
    category: 'sport',
    description: 'Parlons football !',
    isActive: true,
    isFeatured: true,
    tags: ['football', 'sport', 'équipe'],
    members: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '#MARVEL',
    category: 'cinema',
    description: 'Univers Marvel et super-héros',
    isActive: true,
    isFeatured: true,
    tags: ['marvel', 'superhero', 'cinema'],
    members: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: '#RAP',
    category: 'musique',
    description: 'Culture rap et hip-hop',
    isActive: true,
    isFeatured: true,
    tags: ['rap', 'hiphop', 'musique'],
    members: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Base de données T4lkR initialisée avec succès !');
