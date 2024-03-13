import React, { useState } from 'react';
import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore/lite';

const CadastroAluno = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');

  // inclusão no DB de aluno
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

  // seleção qnt de aulas
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return(
    <div style={styles.cadastroContainer}>
      <h2 style={styles.texto}>Cadastro de Aluno</h2>
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
            <div>
              <select
                style={styles.select}
                value={selectedOption}
                onChange={handleSelectChange}>
                <option value="">Quantidade de aulas na semana</option>
                <option value="option1">1 aula</option>
                <option value="option2">2 aulas</option>
                <option value="option3">3 aulas</option>
              </select>
            </div>
            <button style={styles.btnCadastrar} onClick={handleCadastro}>Cadastrar Aluno</button>
    </div>
  )

}

const styles = {
  cadastroContainer: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    margin: '30px'
  },
  texto: {
    color: '#FAC670'
  },
  formGroup: {
    marginBottom: '15px',
  },
  select: {
    marginBottom: '15px'
  },
  btnCadastrar: {
    backgroundColor: '#6ABC8B',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  btnCadastrarHover: {
    backgroundColor: '#0056b3',
  }
}

export default CadastroAluno;
