import { db } from '../firebase'
import { doc, updateDoc, arrayRemove } from 'firebase/firestore/lite';

export const excluirAlunoDoHorarProf = async (emailProf, dadosAluno) => {
  const nome = dadosAluno.nome
  const email = dadosAluno.email
  const qntAulas = dadosAluno.qntAulasAtual
  const diaAula1 = dadosAluno.diaAula1Atual
  const diaAula2 = dadosAluno.diaAula2Atual
  const diaAula3 = dadosAluno.diaAula3Atual
  const horaAula1 = dadosAluno.horaAula1Atual
  const horaAula2 = dadosAluno.horaAula2Atual
  const horaAula3 = dadosAluno.horaAula3Atual

  if (qntAulas === '1aula') {
    updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
      alunos: arrayRemove({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
    })
  }
  if (qntAulas === '2aulas') {
    updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
      alunos: arrayRemove({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
    })
    updateDoc(doc(db, 'Professores', emailProf, diaAula2, horaAula2), {
      alunos: arrayRemove({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
    })
  }
  if (qntAulas === '3aulas') {
    updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
      alunos: arrayRemove({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
    })
    updateDoc(doc(db, 'Professores', emailProf, diaAula2, horaAula2), {
      alunos: arrayRemove({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
    })
    updateDoc(doc(db, 'Professores', emailProf, diaAula3, horaAula3), {
      alunos: arrayRemove({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
    })
  }
}


