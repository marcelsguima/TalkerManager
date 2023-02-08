const express = require('express');
const crypto = require('crypto');
const talkers = require('./talker');

// const validateLogin = require('./middleware/validateLogin');

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

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length <= 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

    if (!email) {
  return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

  next();
};

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const user = req.body;
  // const userLogin = await file.createLogin(email, password)

 console.log(user);
  return res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

// não remova esse endpoint, e para o avaliador funcionar 
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
