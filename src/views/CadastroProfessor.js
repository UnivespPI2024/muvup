import React, { useState } from 'react';

import styleViews from '../estilos/styleViews'

import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore/lite';

const CadastroProfessor = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');

  // inclusão no DB de professor
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
    <div style={styleViews.cadastroContainer}>
      <h2 style={styleViews.texto}>Cadastro de Professor</h2>
            <div style={styleViews.formGroup}>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div style={styleViews.formGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={styleViews.formGroup}>
              <input
                type="text"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div style={styleViews.formGroup}>
              <input
                type="text"
                placeholder="Endereço"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
            <div style={styleViews.formGroup}>
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </div>
            <div>
              <select
                style={styleViews.select}
                value={selectedOption}
                onChange={handleSelectChange}>
                <option value="">Quantidade de aulas na semana</option>
                <option value="option1">1 aula</option>
                <option value="option2">2 aulas</option>
                <option value="option3">3 aulas</option>
              </select>
            </div>
            <button style={styleViews.btnCadastrar} onClick={handleCadastro}>Cadastrar Professor</button>
    </div>
  )
}

export default CadastroProfessor;
