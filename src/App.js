import React, { useState } from 'react';

import logo from './images/logo.png';
import CadastroAluno from './views/CadastroAluno';
import CadastroProfessor from './views/CadastroProfessor';
import ProcurarTodosAlunos from './views/ProcurarTodosAlunos';
import ProcurarAluno from './views/ProcurarAluno';
import MenuLateral from './views/MenuLateral';

function App() {
  const [currentComponent, setCurrentComponent] = useState('cadastroAluno');

  const handleItemClick = (component) => {
    setCurrentComponent(component);
  };

  return (
    <div>
      <MenuLateral onItemClick={handleItemClick}></MenuLateral>
      <div style={styles.container}>
        <div style={styles.containerConteudo}>
          <div style={styles.logoContainer}>
            <img src={logo} style={styles.logo}></img>
          </div>
          <div style={styles.containerCadastro}>
            {currentComponent === 'cadastroAluno' && <CadastroAluno></CadastroAluno>}
            {currentComponent === 'cadastroProfessor' && <CadastroProfessor></CadastroProfessor>}
            {currentComponent === 'todosAlunos' && <ProcurarTodosAlunos></ProcurarTodosAlunos>}
            {currentComponent === 'procurarAluno' && <ProcurarAluno></ProcurarAluno>}
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
