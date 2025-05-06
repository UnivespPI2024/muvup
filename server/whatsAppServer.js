const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();
console.log(process.env.TWILIO_ACCOUNT_SID); 

const app = express();
const port = 5000;

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Servidor está rodando corretamente.');
  });

app.post('/send-whatsapp', (req, res) => {
  const { to, message } = req.body;

  client.messages
    .create({
      body: message,
      from: 'whatsapp:+14155238886', 
      to: `whatsapp:${to}`
    })
    .then((message) => {
      res.status(200).json({ success: true, sid: message.sid });
    })
    .catch((err) => {
      res.status(500).json({ success: false, error: err.message });
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
