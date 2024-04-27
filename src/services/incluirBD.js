import { db } from '../firebase'
import {  doc, updateDoc, arrayUnion } from 'firebase/firestore/lite';

export const incluirEdicaoAlunoDoHorarioProf = (emailProf, dadosAluno) => {
    
    const nome = dadosAluno.nome
    const qntAulas = dadosAluno.qntAulas
    const diaAula1 = dadosAluno.diaAula1
    const diaAula2 = dadosAluno.diaAula2
    const diaAula3 = dadosAluno.diaAula3
    const horaAula1 = dadosAluno.horaAula1
    const horaAula2 = dadosAluno.horaAula2
    const horaAula3 = dadosAluno.horaAula3
    
    if (qntAulas == '1aula') {
        updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
            alunos: arrayUnion({ nomeAluno: nome, status: 'Regular' })
        })
    }
    if (qntAulas == '2aulas') {
        updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
            alunos: arrayUnion({ nomeAluno: nome, status: 'Regular' })
        })
        updateDoc(doc(db, 'Professores', emailProf, diaAula2, horaAula2), {
            alunos: arrayUnion({ nomeAluno: nome, status: 'Regular' })
        })
    }

    if (qntAulas == '3aulas') {
        updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
            alunos: arrayUnion({ nomeAluno: nome, status: 'Regular' })
        })
        updateDoc(doc(db, 'Professores', emailProf, diaAula2, horaAula2), {
            alunos: arrayUnion({ nomeAluno: nome, status: 'Regular' })
        })
        updateDoc(doc(db, 'Professores', emailProf, diaAula3, horaAula3), {
            alunos: arrayUnion({ nomeAluno: nome, status: 'Regular' })
        })
    }
}


