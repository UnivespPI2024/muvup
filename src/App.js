import React, { useState } from 'react';

import logo from './images/logo.png';
import CadastroAluno from './views/CadastroAluno';
import CadastroProfessor from './views/CadastroProfessor';
import FlatListAlunos from './views/FlatListAlunos';
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
      <div style={styles.logoContainer}>
        <img src={logo} style={styles.logo}></img>
      </div>
      <div style={styles.container}>
        {currentComponent === 'cadastroAluno' && <CadastroAluno></CadastroAluno>}
        {currentComponent === 'cadastroProfessor' && <CadastroProfessor></CadastroProfessor>}
        {currentComponent === 'todosAlunos' && <FlatListAlunos></FlatListAlunos>}
        {currentComponent === 'procurarAluno' && <ProcurarAluno></ProcurarAluno>}
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
  },
  logo: {
    height: '300px',
    textAlign: 'center'
  }
}
