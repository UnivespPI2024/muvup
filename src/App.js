import logo from './images/logo.png';
import CadastroAluno from './componentes/CadastroAluno';
import CadastroProfessor from './componentes/CadastroProfessor';
import React, { useState } from 'react';
import { db } from './firebase'
import { getDocs , collection } from 'firebase/firestore/lite';

function App() {

  async function pegarCadastros(db){
    const usuarios = collection(db, 'Usuários');
    const usuarioSnapshot = await getDocs(usuarios);
    const listaUsuários = usuarioSnapshot.docs.map(doc => doc.data());
    console.log(listaUsuários);
    return listaUsuários; 
  }

  pegarCadastros(db)

  return (
    <div>
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
