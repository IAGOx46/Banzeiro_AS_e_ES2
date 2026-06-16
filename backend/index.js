const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config({ quiet: process.env.NODE_ENV === 'test' });
const bodyParser = require('body-parser');

const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH || './serviceAccountKey.json';

try {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  if (process.env.NODE_ENV !== 'test') {
    console.log('Firebase conectado com sucesso.');
  }
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn('Nao foi possivel inicializar o Firebase Admin.');
    console.warn(err.message);
  }
}

let db = null;

try {
  db = admin.firestore ? admin.firestore() : null;
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn('Nao foi possivel obter o Firestore.');
    console.warn(err.message);
  }
}

function createApp(database = db) {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Banzeiro backend OK');
  });

  app.get('/api/alerts', async (req, res) => {
    try {
      if (!database) throw new Error('Firestore nao inicializado');

      const snapshot = await database.collection('alerts').orderBy('createdAt', 'desc').get();
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/alerts', async (req, res) => {
    try {
      if (!database) throw new Error('Firestore nao inicializado');

      const { text } = req.body;
      const doc = await database.collection('alerts').add({
        text,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      res.json({ id: doc.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return app;
}

const app = createApp();

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend rodando na porta ${PORT}`);
  });
}

module.exports = {
  app,
  createApp
};
