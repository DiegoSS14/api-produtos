const express = require('express');
const cors = require('cors')
const router = require('./routes/productsRouter')

const app = express();

// Permite que a API rode em conjunto com o front-end que está em uma porta diferente (3000)
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.0.112:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))

app.use(express.json()); // Permite que a API consiga interpretar .json
app.use(router);

module.exports = app;