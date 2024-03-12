import logo from './images/logo.png';
import React, { useState } from 'react';
import { db } from './firebase'
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';

function App() {
  // const db = getFirestore(app)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');

  const handleCadastro = () => {
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Telefone:', telefone);
    console.log('Endereço:', endereco);
    console.log('Cidade:', cidade);

    setDoc(doc(db, 'Usuários', email), {
      nome: nome,
      email: email,
      telefone: telefone,
      endereco: endereco,
      cidade: cidade
    });

    
  };
  return (
    <div >
      <div style={styles.logoContainer}>
        <img src={logo} style={styles.logo}></img>
      </div>
      <div style={styles.cadastroContainer}>
        <h2>Cadastro de Cliente</h2>
        <div style={styles.formGroup}>
          <input
            type="text" 
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>
        <button style={styles.btnCadastrar} onClick={handleCadastro}>Cadastrar Cliente</button>
      </div>
    </div>
  );
}

export default App;

const styles={
  texto:{
    color:'red',
    fontSize:30
  },
  logoContainer:{
    display: 'flex',
    justifyContent: 'center'    
  },
  logo:{
    height:'300px',
    textAlign:'center'
  },
  cadastroContainer:{
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  formGroup:{
    marginBottom: '15px',
  },
  btnCadastrar:{
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  btnCadastrarHover:{
    backgroundColor: '#0056b3',
  }
}
