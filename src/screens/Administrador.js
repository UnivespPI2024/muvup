import React, { useState } from 'react';

import logo from '../images/logo.png';
import Header from '../views/Header';
import CadastroAluno from '../views/CadastroAluno';
import CadastroProfessor from '../views/CadastroProfessor';
import CadastroAdministrador from '../views/CadastroAdministrador';
import ProcurarTodosAlunos from '../views/ProcurarTodosAlunos';
import ProcurarTodosProf from '../views/ProcurarTodosProf';
import ProcurarAluno from '../views/ProcurarAluno';
import MenuLateral from '../views/MenuLateralAdministrador';
import ReagendarAluno from '../views/ReagendarAluno';

import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Administrador() {
  const [componenteAtual, setComponenteAtual] = useState('cadastroAluno');
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
      <MenuLateral onItemClick={handleItemClick}></MenuLateral>
      <div style={styles.container}>
        <div style={styles.containerConteudo}>
          <div style={styles.logoContainer}>
            <img src={logo} style={styles.logo} alt="Logo"></img>
          </div>
          <div style={styles.containerCadastro}>
            {componenteAtual === 'cadastroAluno' && <CadastroAluno></CadastroAluno>}
            {componenteAtual === 'cadastroProfessor' && <CadastroProfessor></CadastroProfessor>}
            {componenteAtual === 'cadastroAdministrador' && <CadastroAdministrador></CadastroAdministrador>}
            {componenteAtual === 'todosAlunos' && <ProcurarTodosAlunos></ProcurarTodosAlunos>}
            {componenteAtual === 'todosProfessores' && <ProcurarTodosProf></ProcurarTodosProf>}
            {componenteAtual === 'procurarAluno' && <ProcurarAluno></ProcurarAluno>}
            {componenteAtual === 'reagendarAluno' && <ReagendarAluno></ReagendarAluno>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Administrador;

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
