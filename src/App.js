import logo from './images/logo.png';
import CadastroAluno from './views/CadastroAluno';
import CadastroProfessor from './views/CadastroProfessor';
import FlatListExample from './componentes/FlatlistAlunos';
import React from 'react';
import { db } from './firebase'
import { getDocs , collection } from 'firebase/firestore/lite';

function App() {
 let alunos

  async function getAlunosCadastrados(db){
    const alunos = collection(db, 'Alunos');
    const alunosSnapshot = await getDocs(alunos);
    const listaAlunos = alunosSnapshot.docs.map(doc => doc.data());
    return listaAlunos; 
  }

  alunos = getAlunosCadastrados(db)
  console.log(alunos);

  return (
    <div>
      <div style={styles.logoContainer}>
        <img src={logo} style={styles.logo}></img>
      </div>
      <div style={styles.container}>
        <CadastroAluno></CadastroAluno>
        <CadastroProfessor></CadastroProfessor>
        <FlatListExample></FlatListExample>
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
