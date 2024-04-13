import React, { useState, useEffect } from 'react';
import styleListas from '../estilos/styleListas'

import { getDocs, collection, doc, query } from 'firebase/firestore/lite';
import { db } from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";



const ListarAulasProfessor = () => {

  const listaAulas = []

  const auth = getAuth()

  const [emailProf, setEmailProf] = useState('');
  const [listaAulasSemanaProf, setListaAulasSemanaProf] = useState([{}]);
  const diasDaSemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta']

  const handleMostrar = () => {
    setListaAulasSemanaProf(listaAulas)
  }

  //função quer gera os grupos semanais (segunda - sexta)
  function gruposSemanaProximos30Dias() {
    const gruposSemana = [];
    const hoje = new Date();

    // Verifica se hoje está entre segunda-feira e sexta-feira
    if (hoje.getDay() >= 1 && hoje.getDay() <= 5) {
        let proximaSegunda = new Date(hoje);
        proximaSegunda.setDate(hoje.getDate() - hoje.getDay() + 1); // Volta para a segunda-feira atual

        const proximaSexta = new Date(proximaSegunda);
        proximaSexta.setDate(proximaSegunda.getDate() + 4);
        gruposSemana.push({
            inicio: proximaSegunda.toLocaleDateString("pt-BR"),
            fim: proximaSexta.toLocaleDateString("pt-BR")
        });
    }

    // Encontrar a próxima segunda-feira a partir de hoje
    let proximaSegunda = new Date(hoje);
    proximaSegunda.setDate(hoje.getDate() + (8 - hoje.getDay()) % 7);

    // Adicionar os grupos de início (segunda-feira) e fim (sexta-feira) de cada semana
    for (let i = 0; i < 4; i++) {
        let proximaSexta = new Date(proximaSegunda);
        proximaSexta.setDate(proximaSegunda.getDate() + 4);

        gruposSemana.push({
            inicio: proximaSegunda.toLocaleDateString("pt-BR"),
            fim: proximaSexta.toLocaleDateString("pt-BR")
        });

        // Atualizar para a próxima semana
        proximaSegunda.setDate(proximaSegunda.getDate() + 7);
    }

    return gruposSemana;
}

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
    if (emailProf !== '') {
      diasDaSemana.forEach(dia => {
        (async () => {
          const qAulas = query(collection(db, 'Professores', emailProf, dia));
          const querySnapshot = await getDocs(qAulas).catch((error) => { console.log('erro', error); })
          await querySnapshot.docs.forEach(doc => {
            if (Object.values(doc.data().alunos).length !== 0) {
              listaAulas.push({
                dia: dia,
                horario: doc.id,
                alunos: doc.data().alunos
              })
            }
          })
        })()
      })
      console.log('grupos',gruposSemanaProximos30Dias())
      console.log('listaAulas', listaAulas);
    }
  }, [emailProf])

  return (
    <div style={styleListas.container}>
      <div style={styleListas.containerLista}>
        <button onClick={handleMostrar}>Mostrar</button>
        <h2 style={styleListas.heading}>Aulas da Semana do Professor:</h2>
        <div style={styleListas.listContainer}>
          {(listaAulasSemanaProf.map(item => (
            <div>
              <div key={item.dia} style={styleListas.item}>
                <span style={styleListas.divider}>Dia: {item.dia} </span>
                <span style={styleListas.divider}>Horário: {item.horario} </span>
                <span style={styleListas.divider}>Alunos: {item.alunos} </span>

              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default ListarAulasProfessor;