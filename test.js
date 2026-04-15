const express = require('express');
const app = express();

app.use(express.json());

app.post('/register', (req, res) => {
  res.json({ message: 'Funciona!', data: req.body });
});

app.listen(3000, () => {
  console.log('Servidor de prueba en puerto 3000');
});