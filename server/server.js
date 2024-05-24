const express = require('express');
const admin = require('./firebaseAdmin');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rota para excluir usuário
app.delete('/deleteUser', async (req, res) => {
  const { uid } = req.body;

  try {
    await admin.auth().deleteUser(uid);
    res.status(200).send('Usuário excluído com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao excluir usuário: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});