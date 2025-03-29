import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send-whatsapp', {
        to: phoneNumber,
        message: message
      });
      setStatus(`Mensagem enviada com sucesso! SID: ${response.data.sid}`);
    } catch (error) {
      setStatus(`Erro: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Enviar WhatsApp via Twilio</h1>
      <input
        type="text"
        placeholder="Número de telefone (ex: +5511999999999)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder="Digite sua mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Enviar Mensagem</button>
      <p>{status}</p>
    </div>
  );
}

export default App;
