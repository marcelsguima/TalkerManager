const express = require('express');
const crypto = require('crypto');
const talkers = require('./talker');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  const allTalkers = await talkers.getAllTalkers();
  res.status(200).json(allTalkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const user = await talkers.getTalkerById(Number(id));
  if (!user) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(user);
}); 

app.post('/login', async (req, res) => {
  const user = req.body;
  // console.log(user);
  return res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});
// 
// não remova esse endpoint, e para o avaliador funcionar 
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
