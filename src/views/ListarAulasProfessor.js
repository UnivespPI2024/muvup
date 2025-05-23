import React, { useState, useEffect } from 'react';

import { getDocs, collection, arrayUnion, query } from 'firebase/firestore/lite';
import { db } from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ListarAulasProfessor = () => {

  const diasDaSemana = {
    0: 'domingo', 1: 'segunda', 2: 'terça', 3: 'quarta',
    4: 'quinta', 5: 'sexta', 6: 'sabado',
  };

  const auth = getAuth()

  const [emailProf, setEmailProf] = useState('');
  const [listaAulasSemanaProf, setListaAulasSemanaProf] = useState([{}]);
  const [gruposDiasSemana, setGruposDiasSemana] = useState([]);
  const [semanaSelec, setSemanaSelec] = useState([]);

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
      let diaAtual = new Date(hoje);
      diaAtual.setDate(hoje.getDate());
      const proximaSexta = new Date(diaAtual);
      proximaSexta.setDate(diaAtual.getDate() + 5 - diaAtual.getDay());

      const semanaStr = 'Semana de: ' + diaAtual.toLocaleDateString("pt-BR") +
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
      // console.log('verificação logado');
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

  const buscarAulas = async (dia) => {
    let aulas = []
    const diaDaSemana = diasDaSemana[dia.getDay()]
    const diaDoMesFormat = dia.toLocaleDateString("pt-BR")
    let diaDoMes = dia.toLocaleDateString("pt-BR").split('/')
    const mesNormal = parseInt(diaDoMes[1])
    diaDoMes[1] = mesNormal + ''
    const diaData = diaDoMes[0]
    const mesData = diaDoMes[1]
    const anoData = diaDoMes[2]
    diaDoMes = `${diaData}-${mesData}-${anoData}`

    //consulta de aulas regulares do professor
    const qAulas = query(collection(db, 'Professores', emailProf, diaDaSemana));
    const querySnapshot = await getDocs(qAulas).catch((error) => { console.log('erro', error); })
    querySnapshot.forEach(doc => {
      if (Object.values(doc.data().alunos).length !== 0) {
        let valoresDias = aulas.map(objeto => objeto['diaMes']);
        if (!valoresDias.includes(diaDoMesFormat)) {
          aulas.push({ diaSemana: diaDaSemana, diaMes: diaDoMesFormat, horarios: [{ horario: doc.id, alunos: doc.data().alunos }] })
        } else {
          aulas[0].horarios.push({ horario: doc.id, alunos: doc.data().alunos })
        }
      }
    })

    //consulta de aulas remarcadas do professor
    const qHorariosRemarc = query(collection(db, 'Professores', emailProf, 'AulasReagendadas'));
    const querySnapshotHorRemarc = await getDocs(qHorariosRemarc).catch((error) => { console.log('erro', error); })
    const objRemarc = []
    querySnapshotHorRemarc.forEach((docDia) => {
      if (docDia.id == diaDoMes) {
        Object.keys(docDia.data()).forEach((horario, idx) => {
          let valoresDias = aulas.map(objeto => objeto['diaMes']);
          let valoresHorarios = aulas[0].horarios.map(objeto => objeto['horario']);
          if (!valoresDias.includes(diaDoMesFormat)) {
            aulas.push({ diaSemana: diaDaSemana, diaMes: diaDoMesFormat, horarios: [{ horario, alunos: Object.values(docDia.data())[idx] }] })
          } else {
            if (!valoresHorarios.includes(horario)) {
              aulas[0].horarios.push({ horario, alunos: Object.values(docDia.data())[idx] })
            } else {
              const idxHor = aulas[0].horarios.findIndex(objeto => objeto.horario === horario)
              Object.values(docDia.data())[idx].forEach(itemAluno=>{
                console.log('item',itemAluno);
                aulas[0].horarios[idxHor].alunos.push(itemAluno)
              })
            }
          }
        })
      }
    })

    //consulta de aulas desmarcadas do professor
    const qHorariosDesmarc = query(collection(db, 'Professores', emailProf, 'AulasDesmarcadas'));
    const querySnapshotHorDesmarc = await getDocs(qHorariosDesmarc).catch((error) => { console.log('erro', error); })
    const objDesmarc = []
    querySnapshotHorDesmarc.forEach((docDia) => {
      if (docDia.id == diaDoMes) {
        Object.keys(docDia.data()).forEach((hor) => {
          console.log('hor', docDia.data()[hor]);
          docDia.data()[hor].forEach(alunos => {
            objDesmarc.push({
              nomeAluno: alunos.nomeAluno,
              horario: hor
            })
          })
        })
        objDesmarc.forEach(itemObj => {
          aulas[0].horarios.forEach((itemHor, idxHor) => {
            if (itemObj.horario === itemHor.horario) {
              aulas[0].horarios[idxHor].alunos.forEach((itemNome, idxNome) => {
                if (itemObj.nomeAluno === itemNome.nomeAluno) {
                  aulas[0].horarios[idxHor].alunos[idxNome].status = 'Desmarcada'
                }
              })
            }
          })
        })
      }
    })
    return aulas
  }

  const buscarAulasSemanaProf = async (semana) => {
    let datas = []
    if (semana !== '') {
      const inicioSemana = semana.split(' ')[2].split('/')
      const dataInicio = new Date(inicioSemana[2], inicioSemana[1] - 1, inicioSemana[0])
      const fimSemana = semana.split(' ')[4].split('/')
      const dataFim = new Date(fimSemana[2], fimSemana[1] - 1, fimSemana[0])
      datas = diasEntreDatas(dataInicio, dataFim)
      // console.log('listaDatas', datas);
    }

    let aulasRegulares = []
    aulasRegulares = await Promise.all(datas.map(async dia => {
      return await buscarAulas(dia)
    }))
    const aulasNormaliz = aulasRegulares.filter(arr => arr.length > 0) //retira itens vazios
    const uniaoAulas = [].concat(...aulasNormaliz)
    setListaAulasSemanaProf(uniaoAulas)
    console.log('uniaoAulas', uniaoAulas);
  }

  function RenderNomeAluno({ items }) {
    return (
      <ul>
        {
          items ?
            items.map((item, idx) => (
              <li key={idx} style={{
                color: item.status === 'Remarcada' ? 'blue' :
                  item.status === 'Desmarcada' ? 'red' : 'black'
              }}>{item.nomeAluno}</li>
            )) : null
        }
      </ul>

    );
  }

  function RenderHorario({ items }) {
    return (
      <ul>
        {
          items ?
            items.map((item, idx) => (
              <li key={idx} className={'divider'}>Horário: {item.horario.substring(3, 5) + ':00 h'}
                <RenderNomeAluno items={item.alunos} />
              </li>
            )) : null
        }
      </ul>
    );
  }

  return (
    <div className={'container'}>
      <div className={'containerLista'}>
        <h2 className={'heading'}>Aulas da Semana do Professor:</h2>
        <select
          className={'select'}
          value={semanaSelec}
          onChange={handleSelectSemana}>
          <option value="">Selecione uma semana</option>
          {gruposDiasSemana.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className={'listContainer'}>
          {
            listaAulasSemanaProf.map((item, idx) => (
              <div>
                <div key={idx} className={'item'}>
                  <span className={'divider'}>{item.diaSemana ? item.diaSemana + ' - ' : null} {item.diaMes} </span>
                  <RenderHorario items={item.horarios} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className='containerLegendas'>
        <h2 className={'texto'}>Legenda:</h2>
        <div className={'containerLegenda'}>
          <div className={'boxLegendaPreto'}></div>
          <span className={'textoPequeno'}>Aulas Regulares</span>
        </div>
        <div className={'containerLegenda'}>
          <div className={'boxLegendaAzul'}></div>
          <span className={'textoPequeno'}>Aulas Remarcadas</span>
        </div>
        <div className={'containerLegenda'}>
          <div className={'boxLegendaVermelho'} ></div>
          <span className={'textoPequeno'}>Aulas Desmarcadas</span>
        </div>
      </div>
    </div>

  );
};

export default ListarAulasProfessor;