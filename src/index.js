const express = require('express');
const crypto = require('crypto');
const talkers = require('./talker');
const { validatePassword,
  validateEmail,
  validateToken,
  validateAge,
  validateName,
  validateRate,
validateTalk } = require('./middleware/validations');

const app = express();
app.use(express.json());

app.get('/talker', async (req, res) => {
  const allTalkers = await talkers.getAllTalkers();
  res.status(200).json(allTalkers);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const delTalker = await talkers.deleteTalker(id);
  console.log(delTalker);

    res.status(204).json();
});

app.post('/talker', 
validateToken,
validateName,
validateAge,
validateTalk,
validateRate,
 async (req, res) => {
  const allTalkers = await talkers.getAllTalkers();
  const newTalker = { id: allTalkers.length + 1, ...req.body };
  await talkers.saveUser((newTalker));
 return res.status(201).json(newTalker);  
});

app.put('/talker/:id', 
validateToken,
validateName,
validateAge,
validateTalk,
validateRate,
 async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const editedUser = { name, age, talk: { watchedAt, rate }, id: Number(id) };
  await talkers.saveUser((editedUser));
 return res.status(200).json(editedUser);  
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const user = await talkers.getTalkerById(Number(id));
  if (!user) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(user);
}); 

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const user = req.body;
  console.log(user);
  return res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

// não remova esse endpoint, e para o avaliador funcionar 
const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
