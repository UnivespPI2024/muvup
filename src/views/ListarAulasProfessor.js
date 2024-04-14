import React, { useState, useEffect } from 'react';
import styleListas from '../estilos/styleListas'
import styleViews from '../estilos/styleViews'

import { getDocs, collection, doc, query } from 'firebase/firestore/lite';
import { db } from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ListarAulasProfessor = () => {


  const auth = getAuth()

  const [emailProf, setEmailProf] = useState('');
  const [listaAulasSemanaProf, setListaAulasSemanaProf] = useState([{}]);
  const [gruposDiasSemana, setGruposDiasSemana] = useState([]);
  const [semanaSelec, setSemanaSelec] = useState([]);
  const diasDaSemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta']

  const handleSelectSemana = (event) => {
    setSemanaSelec(event.target.value)
    buscarAulasSemanaProf(event.target.value)
  }

  //função quer gera os grupos semanais (segunda - sexta)
  useEffect(() => {
    const gruposSemana = [];
    const hoje = new Date();

    // Verifica se hoje está entre segunda-feira e sexta-feira
    if (hoje.getDay() >= 1 && hoje.getDay() <= 5) {
      let proximaSegunda = new Date(hoje);
      proximaSegunda.setDate(hoje.getDate() - hoje.getDay() + 1); // Volta para a segunda-feira atual

      const proximaSexta = new Date(proximaSegunda);
      proximaSexta.setDate(proximaSegunda.getDate() + 4);

      const semanaStr = 'Semana de: ' + proximaSegunda.toLocaleDateString("pt-BR") +
        ' até ' + proximaSexta.toLocaleDateString("pt-BR")

      gruposSemana.push(semanaStr);
    }

    // Encontrar a próxima segunda-feira a partir de hoje
    let proximaSegunda = new Date(hoje);
    proximaSegunda.setDate(hoje.getDate() + (8 - hoje.getDay()) % 7);

    // Adicionar os grupos de início (segunda-feira) e fim (sexta-feira) de cada semana
    for (let i = 0; i < 4; i++) {
      let proximaSexta = new Date(proximaSegunda);
      proximaSexta.setDate(proximaSegunda.getDate() + 4);

      const semanaStr = 'Semana de: ' + proximaSegunda.toLocaleDateString("pt-BR") +
        ' até ' + proximaSexta.toLocaleDateString("pt-BR")

      gruposSemana.push(semanaStr);

      // Atualizar para a próxima semana
      proximaSegunda.setDate(proximaSegunda.getDate() + 7);
    }

    setGruposDiasSemana(gruposSemana)
  }, [])


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

  //função que retorna quantos dias tem entre duas datas
  function diasEntreDatas(dataInicio, dataFim) {
    var listaDias = [];
    var dataAtual = new Date(dataInicio);
    while (dataAtual <= dataFim) {
      listaDias.push(new Date(dataAtual));
      dataAtual.setDate(dataAtual.getDate() + 1);
    }
    return listaDias;
  }

  const buscarAulasSemanaProf = async (semana) => {
    const listaAulas = []
    const inicioSemana = semana.split(' ')[2].split('/')
    const dataInicio = new Date(inicioSemana[2],inicioSemana[1]-1,inicioSemana[0])
    const fimSemana = semana.split(' ')[4].split('/')
    const dataFim = new Date(fimSemana[2],fimSemana[1]-1,fimSemana[0])
    console.log('listaDatas',diasEntreDatas(dataInicio,dataFim));
    console.log('inicioSemana', dataInicio, 'fimSemana', dataFim);

    console.log('chamou');
    diasDaSemana.forEach(async (dia) => {
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
    })
    setTimeout(() => {
      console.log('listaAulas', listaAulas);
      setListaAulasSemanaProf(listaAulas)
    }, 1500)
  }


  return (
    <div style={styleListas.container}>
      <div style={styleListas.containerLista}>
        <h2 style={styleListas.heading}>Aulas da Semana do Professor:</h2>
        <select
          style={styleViews.select}
          value={semanaSelec}
          onChange={handleSelectSemana}>
          <option value="">Selecione uma semana</option>
          {gruposDiasSemana.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
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