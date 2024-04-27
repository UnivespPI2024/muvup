import { db } from '../firebase'
import { collection, getDocs, query, where, doc } from 'firebase/firestore/lite';
import { MAX_ALUNOS } from '../constantes';

export const excluirAlunoDoHorarProf = async (emailProf, dadosAluno) => {
  const nome = dadosAluno.nome
  const email = dadosAluno.email
  const qntAulas = dadosAluno.qntAulas
  const diaAula1 = dadosAluno.diaAula1
  const diaAula2 = dadosAluno.diaAula2
  const diaAula3 = dadosAluno.diaAula3
  const horaAula1 = dadosAluno.horaAula1
  const horaAula2 = dadosAluno.horaAula2
  const horaAula3 = dadosAluno.horaAula3

  console.log('emailProf', emailProf, 'dados', dadosAluno)
  const q = query(doc(db, 'Professores', emailProf, diaAula1, horaAula1),where('emailAluno','==',email));
  const querySnapshot = await getDocs(q).catch((error) => { console.log('erro', error); })
  

  querySnapshot.forEach(doc => {
    console.log('doc.data()',doc.data());
  })
  return 'dsf'
}


