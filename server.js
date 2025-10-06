const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Connectez-vous à MongoDB
mongoose.connect('mongodb://localhost:27017/integration-cloud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Allows 5 seconds to select an available server
}).then(() => console.log('MongoDB connecté...')).catch(err => console.log(err));

// Démarrez le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});