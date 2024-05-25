const express = require('express');
const admin = require('./firebaseAdmin');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000', 
}));

app.use(express.json());

app.delete('/deleteUserByEmail', async (req, res) => {
  const { email } = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().deleteUser(userRecord.uid);
    res.status(200).send('Usuário excluído com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao excluir usuário: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});