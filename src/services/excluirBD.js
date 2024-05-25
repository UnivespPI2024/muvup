import React, { useState, useEffect } from 'react';

import { db } from '../firebase'
import { doc, updateDoc, arrayRemove, getDoc, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, deleteUser, getUser } from "firebase/auth";
import axios from 'axios';


export const excluirAlunoDoHorarProf = async (emailProf, dadosAluno) => {

  const nome = dadosAluno.nome; const email = dadosAluno.email; const qntAulas = dadosAluno.qntAulas;
  const diaAula1 = dadosAluno.diaAula1; const diaAula2 = dadosAluno.diaAula2; const diaAula3 = dadosAluno.diaAula3;
  const horaAula1 = dadosAluno.horaAula1; const horaAula2 = dadosAluno.horaAula2; const horaAula3 = dadosAluno.horaAula3;

  console.log(emailProf, diaAula1, diaAula2, diaAula3, horaAula1, horaAula2, horaAula3);

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

export const excluirUsuario = async () => {
  console.log('entrou no excluirUsuario')
  try {
    const response = await axios.delete('http://localhost:3000/deleteUser', {
      data: { uid: "7k1obHH2SWhCswvJs7QoppC5DEC3" }
    });
    console.log(response.data)
  } catch (error) {
    console.log(error.response.data)
  }
}



