import React, { useState, useEffect } from 'react';
import styleListas from '../estilos/styleListas'

import { getDocs, collection, doc, query } from 'firebase/firestore/lite';
import { db } from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";



const ListarAulasProfessor = () => {

  const auth = getAuth()

  const [emailProf, setEmailProf] = useState('');
  const [listaAulasSemanaProf, setListaAulasSemanaProf] = useState([{}]);
  const diasDaSemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta']

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('verificação logado');
      if (user) {
        setEmailProf(user.email)
      } else {
        setEmailProf('')
      }
    });
  }, [])

  useEffect(() => {
    diasDaSemana.forEach(dia => {
      (async () => {
        const qHorarios = query(collection(db, 'Professores', 'jtiagotoledo@hotmail.com', dia));
        const querySnapshot = await getDocs(qHorarios).catch((error) => { console.log('erro', error); })
        const horariosDispSemana = querySnapshot.docs.map(doc => {
          if (Object.values(doc.data().alunos).length !== 0) {
            return {[dia]:{[doc.id]:doc.data().alunos}}
          }
        })
        console.log('horariosDispSemana',horariosDispSemana);
      })()
    })
    
  }, [])

  return (
    <div style={styleListas.container}>
      <div style={styleListas.containerLista}>
        <h2 style={styleListas.heading}>Aulas da Semana do Professor:</h2>
        <div style={styleListas.listContainer}>
          {/* (listaProf.map(item => (
              <div>
                <div key={item.email} style={styleListas.item}>
                  <span style={styleListas.divider}>Nome: {item.nome} </span>
                  <span style={styleListas.divider}>Email: {item.email} </span>
                  <span style={styleListas.divider}>Telefone: {item.telefone} </span>

                </div>
              </div>
            ))) */}
        </div>
      </div>
    </div>
  );
};

export default ListarAulasProfessor;