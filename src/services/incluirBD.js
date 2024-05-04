import { db } from '../firebase'
import { doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore/lite';

export const incluirAluno = async (dadosAluno) => {
    const nome = dadosAluno.nome; const email = dadosAluno.email; const qntAulas = dadosAluno.qntAulas; const emailProf = dadosAluno.emailProf;
    const telefone = dadosAluno.telefone; const endereco = dadosAluno.endereco; const cidade = dadosAluno.cidade;
    const diaAula1 = dadosAluno.diaAula1; const diaAula2 = dadosAluno.diaAula2; const diaAula3 = dadosAluno.diaAula3;
    const horaAula1 = dadosAluno.horaAula1; const horaAula2 = dadosAluno.horaAula2; const horaAula3 = dadosAluno.horaAula3;

    setDoc(doc(db, 'Alunos', email), {
        nome: nome, email: email, telefone: telefone, endereco: endereco,
        cidade: cidade, qntAulas: qntAulas, profDoAluno: emailProf, perfil: 'aluno',
        diaHorAula: {
            diaAula1: diaAula1, diaAula2: diaAula2, diaAula3: diaAula3,
            horaAula1: horaAula1, horaAula2: horaAula2, horaAula3: horaAula3,
        }
    })
}

export const incluirEdicaoAlunoNoHorarioProf = async (dadosAluno) => {

    const nome = dadosAluno.nome; const email = dadosAluno.email; const qntAulas = dadosAluno.qntAulas; const emailProf = dadosAluno.emailProf;
    const diaAula1 = dadosAluno.diaAula1; const diaAula2 = dadosAluno.diaAula2; const diaAula3 = dadosAluno.diaAula3;
    const horaAula1 = dadosAluno.horaAula1; const horaAula2 = dadosAluno.horaAula2; const horaAula3 = dadosAluno.horaAula3;

    if (qntAulas === '1aula') {
        updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
            alunos: arrayUnion({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
        })
    }
    if (qntAulas === '2aulas') {
        updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
            alunos: arrayUnion({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
        })
        updateDoc(doc(db, 'Professores', emailProf, diaAula2, horaAula2), {
            alunos: arrayUnion({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
        })
    }

    if (qntAulas === '3aulas') {
        updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
            alunos: arrayUnion({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
        })
        updateDoc(doc(db, 'Professores', emailProf, diaAula2, horaAula2), {
            alunos: arrayUnion({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
        })
        updateDoc(doc(db, 'Professores', emailProf, diaAula3, horaAula3), {
            alunos: arrayUnion({ nomeAluno: nome, emailAluno: email, status: 'Regular' })
        })
    }
}


