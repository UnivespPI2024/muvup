import logo from './images/logo.png';
import CadastroAluno from './componentes/CadastroAluno';
import CadastroProfessor from './componentes/CadastroProfessor';
import React, { useState } from 'react';
import { db } from './firebase'
import { setDoc, doc } from 'firebase/firestore/lite';

function App() {
  return (
    <div >
      <div style={styles.logoContainer}>
        <img src={logo} style={styles.logo}></img>
      </div>
      <div style={styles.container}>
        <CadastroAluno></CadastroAluno>
        <CadastroProfessor></CadastroProfessor>
      </div>
    </div>
  );
}

export default App;

const styles = {
  container: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center'
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '30px'
  },
  logo: {
    height: '300px',
    textAlign: 'center'
  }
}
