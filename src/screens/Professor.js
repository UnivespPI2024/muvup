import React, { useState } from 'react';

import logo from '../images/logo.png';
import Header from '../views/Header';
import MenuLateralProfessor from '../views/MenuLateralProfessor';
import ListarAulasProfessor from '../views/ListarAulasProfessor';

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Professor() {
  const [componenteAtual, setComponenteAtual] = useState('listarAulasProfessor');
  const [escalaFonte, setEscalaFonte] = useState(1);

  const navigate = useNavigate();

  const handleItemClick = (component) => {
    setComponenteAtual(component);
  };

  const handleLogOut = () => {
    console.log('entrouSignOut');
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('deslogado com sucesso');
      navigate('/')
    }).catch((error) => {
      console.log(error);
    });
  }

  //altera escala diretamente no css
  const alterarEscala = (novaEscala) => {
    setEscalaFonte(novaEscala);
    document.documentElement.style.setProperty('--escala-fonte', novaEscala);
  };

  //aumenta a fonte do menu em 10%
  const handleAumFonte = () => {
    if (escalaFonte < 1.5) { 
      alterarEscala(escalaFonte + 0.1); 
    }
  }

  //diminui a fonte do menu em 10%
  const handleDimFonte = () => {
    if (escalaFonte > 0.8) { 
      alterarEscala(escalaFonte - 0.1); 
    }
  }

  return (
    <div>
      <Header logOut={handleLogOut} aumFonte ={handleAumFonte} dimFonte ={handleDimFonte}></Header>
      <MenuLateralProfessor onItemClick={handleItemClick}></MenuLateralProfessor>
      <div style={styles.container}>
        <div style={styles.containerConteudo}>
          <div style={styles.logoContainer}>
            <img src={logo} style={styles.logo}></img>
          </div>
          <div style={styles.containerCadastro}>
            {componenteAtual === 'listarAulasProfessor' && <ListarAulasProfessor></ListarAulasProfessor>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Professor;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'right',
  },
  containerConteudo: {
    width: '80%',
  },
  containerCadastro: {
    display: 'flex',
    justifyContent: 'center',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    marginTop: '120px',
    height: '350px',
    textAlign: 'center'
  }
}
