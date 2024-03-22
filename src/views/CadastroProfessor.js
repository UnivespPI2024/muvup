import React, { useState } from 'react';

import styleViews from '../estilos/styleViews'
import SelHorAulaProf from '../componentes/SelHorAulaProf';

import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore/lite';

const CadastroProfessor = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // inclusão no DB de professor
  const handleCadastro = () => {

    setDoc(doc(db, 'Professores', email), {
      nome: nome,
      email: email,
      telefone: telefone,
    });

  };

  return (
    <div style={styleViews.cadastroContainer}>
      <h2 style={styleViews.texto}>Cadastro de Professor</h2>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.input}
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.input}
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <h2 style={styleViews.textoPequeno}>Horário das aulas:</h2>
      <div style={{display: 'flex', flexDirection:'row'}}>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Segunda-feira:</h2>
          <SelHorAulaProf></SelHorAulaProf>
        </div>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Terça-feira:</h2>
          <SelHorAulaProf></SelHorAulaProf>
        </div>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Quarta-feira:</h2>
          <SelHorAulaProf></SelHorAulaProf>
        </div>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Quinta-feira:</h2>
          <SelHorAulaProf></SelHorAulaProf>
        </div>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Sexta-feira:</h2>
          <SelHorAulaProf></SelHorAulaProf>
        </div>
      </div>
      {/* <button style={styleViews.btnCadastrar} onClick={handleCadastro}>Cadastrar Professor</button> */}
    </div>
  )
}

export default CadastroProfessor;
