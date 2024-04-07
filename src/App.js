import React, { useState } from 'react';

import logo from './images/logo.png';
import Header from './views/Header';
import CadastroAluno from './views/CadastroAluno';
import CadastroProfessor from './views/CadastroProfessor';
import ProcurarTodosAlunos from './views/ProcurarTodosAlunos';
import ProcurarTodosProf from './views/ProcurarTodosProf';
import ProcurarAluno from './views/ProcurarAluno';
import MenuLateral from './views/MenuLateral';
import ReagendarAluno from './views/ReagendarAluno';

function App() {
  const [componenteAtual, setComponenteAtual] = useState('cadastroAluno');

  const handleItemClick = (component) => {
    setComponenteAtual(component);
  };

  return (
    <div>
      <Header></Header>
      <MenuLateral onItemClick={handleItemClick}></MenuLateral>
      <div style={styles.container}>
        <div style={styles.containerConteudo}>
          <div style={styles.logoContainer}>
            <img src={logo} style={styles.logo}></img>
          </div>
          <div style={styles.containerCadastro}>
            {componenteAtual === 'cadastroAluno' && <CadastroAluno></CadastroAluno>}
            {componenteAtual === 'cadastroProfessor' && <CadastroProfessor></CadastroProfessor>}
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

export default App;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'right',
  },
  containerConteudo: {
    width: '85%',
  },
  containerCadastro:{
    display: 'flex',
    justifyContent: 'center',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    height: '350px',
    textAlign: 'center'
  }
}
