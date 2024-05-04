import React, { useState, useEffect } from 'react';

import SelHorAulaAluno from '../componentes/SelHorAulaAluno'
import { consultaAulasDispProf } from '../services/consultasBD'
import { excluirAlunoDoHorarProf } from '../services/excluirBD'
import { incluirEdicaoAlunoNoHorarioProf } from '../services/incluirBD'
import styleViews from '../estilos/styleViews'

import { db } from '../firebase'
import { doc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore/lite';

const EditarAluno = (props) => {
  const [nome, setNome] = useState(props.dadosEditar.nome);
  const [email, setEmail] = useState(props.dadosEditar.email);
  const [emailProfAtual, setEmailProfAtual] = useState(props.dadosEditar.profDoAluno);
  const [emailProf, setEmailProf] = useState('');
  const [telefone, setTelefone] = useState(props.dadosEditar.telefone);
  const [endereco, setEndereco] = useState(props.dadosEditar.endereco);
  const [cidade, setCidade] = useState(props.dadosEditar.cidade);

  const [qntAulasAtual, setQntAulasAtual] = useState(props.dadosEditar.qntAulas);
  const [qntAulas, setQntAulas] = useState('');
  const [diaAula1Atual, setDiaAula1Atual] = useState(props.dadosEditar.diaHorAula.diaAula1);
  const [horaAula1Atual, setHoraAula1Atual] = useState(props.dadosEditar.diaHorAula.horaAula1);
  const [diaAula2Atual, setDiaAula2Atual] = useState(props.dadosEditar.diaHorAula.diaAula2);
  const [horaAula2Atual, setHoraAula2Atual] = useState(props.dadosEditar.diaHorAula.horaAula2);
  const [diaAula3Atual, setDiaAula3Atual] = useState(props.dadosEditar.diaHorAula.diaAula3);
  const [horaAula3Atual, setHoraAula3Atual] = useState(props.dadosEditar.diaHorAula.horaAula3);
  const [diaAula1, setDiaAula1] = useState('');
  const [horaAula1, setHoraAula1] = useState('');
  const [diaAula2, setDiaAula2] = useState('');
  const [horaAula2, setHoraAula2] = useState('');
  const [diaAula3, setDiaAula3] = useState('');
  const [horaAula3, setHoraAula3] = useState('');
  const [hor1DispProf, setHor1DispProf] = useState([])
  const [hor2DispProf, setHor2DispProf] = useState([])
  const [hor3DispProf, setHor3DispProf] = useState([])

  const [nomesProf, setNomesProf] = useState([])
  const [profSelec, setprofSelec] = useState('')

  useEffect(() => {
    (async () => {
      //consulta dos professores
      const professores = collection(db, 'Professores');
      const professoresSnapshot = await getDocs(professores);
      const nomesProfessores = professoresSnapshot.docs.map(doc => doc.data().nome);
      setNomesProf(nomesProfessores)
    })()
  }, [])

  // inclusão no DB de aluno
  const handleEditarAluno = async () => {
    console.log('entrouEditALuno');
    if (nome != '' && email != '' && telefone != '' && endereco != '' && cidade != '' && qntAulas != '') {
      if ((qntAulas === '1aula' && horaAula1 !== '') ||
        (qntAulas === '2aulas' && horaAula1 !== '' && horaAula2 !== '') ||
        (qntAulas === '3aulas' && horaAula1 !== '' && horaAula2 !== '' && horaAula3 !== '')) {
        console.log('entrouEditALuno');
        updateDoc(doc(db, 'Alunos', email), {
          nome: nome,
          email: email,
          telefone: telefone,
          endereco: endereco,
          cidade: cidade,
          qntAulas: qntAulas,
          profDoAluno: emailProf,
          perfil: 'aluno',
          diaHorAula: {
            diaAula1: diaAula1,
            horaAula1: horaAula1,
            diaAula2: diaAula2,
            horaAula2: horaAula2,
            diaAula3: diaAula3,
            horaAula3: horaAula3,
          }
        }).then([
          window.alert('Aluno editado com sucesso!'),
          setNome(''), setEmail(''),
          setTelefone(''), setEndereco(''),
          setCidade(''), setQntAulas(''),
          props.setVisibleEditar(false)]
        )

        const dadosAlunoAtual = {
          nome, email, qntAulas: qntAulasAtual,
          diaAula1: diaAula1Atual, diaAula2: diaAula2Atual, diaAula3: diaAula3Atual,
          horaAula1: horaAula1Atual, horaAula2: horaAula2Atual, horaAula3: horaAula3Atual
        }
        const dadosAluno = {
          nome, email, qntAulas, diaAula1, diaAula2, diaAula3, horaAula1, horaAula2, horaAula3
        }

        excluirAlunoDoHorarProf(emailProfAtual, dadosAlunoAtual)
        incluirEdicaoAlunoNoHorarioProf(dadosAluno)
        props.limparAlunosEncont()

      } else {
        window.alert('Preencha todos os campos obrigatórios!')
      }
    } else {
      window.alert('Preencha todos os campos obrigatórios!')
    }
  };

  const handleSelectProf = (event) => {
    setprofSelec(event.target.value);
    setQntAulas('');
  };

  // seleção qnt de aulas
  const handleSelectQntAulas = async (event) => {
    setQntAulas(event.target.value);
    setDiaAula1(''); setHoraAula1('')
    setDiaAula2(''); setHoraAula2('')
    setDiaAula3(''); setHoraAula3('')
    setHor1DispProf([]); setHor2DispProf([]); setHor3DispProf([])

    //consulta do email do professor
    const q = query(collection(db, "Professores"), where("nome", "==", profSelec));
    const querySnapshot = await getDocs(q).catch((error) => { console.log('erro', error); })
    querySnapshot.forEach(doc => {
      setEmailProf(doc.data().email)
    });
  };

  // seleção de dia e hora para 3 aulas/semana
  const handleSelDia1 = async (dia) => {
    setHor1DispProf([])
    if(dia!==''){
      setDiaAula1(dia)
      const resultado = await consultaAulasDispProf(emailProf, dia)
      setHor1DispProf(resultado)
    }
  }

  const handleSelHora1 = (hora) => {
    setHoraAula1(hora)
  }

  const handleSelDia2 = async (dia) => {
    setHor2DispProf([])
    if(dia!==''){
      setDiaAula2(dia)
      const resultado = await consultaAulasDispProf(emailProf, dia)
      setHor2DispProf(resultado)
    }
  }

  const handleSelHora2 = (hora) => {
    setHoraAula2(hora)
  }

  const handleSelDia3 = async (dia) => {
    setHor3DispProf([])
    if(dia!==''){
      setDiaAula3(dia)
      const resultado = await consultaAulasDispProf(emailProf, dia)
      setHor3DispProf(resultado)
    }
  }

  const handleSelHora3 = (hora) => {
    setHoraAula3(hora)
  }

  return (
    <div style={styleViews.cadastroContainer}>
      <h2 style={styleViews.texto}>Editar Aluno</h2>
      <div style={styleViews.formGroup}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          type="text"
          placeholder="Nome"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
      </div>
      <div>
        <select
          style={styleViews.select}
          value={profSelec}
          onChange={handleSelectProf}>
          <option value="">Escolha um professor</option>
          {nomesProf.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {
        profSelec !== '' ?
          <div>
            <select
              style={styleViews.select}
              value={qntAulas}
              onChange={handleSelectQntAulas}>
              <option value="">Quantidade de aulas na semana</option>
              <option value="1aula">1 aula</option>
              <option value="2aulas">2 aulas</option>
              <option value="3aulas">3 aulas</option>
            </select>
          </div> : null
      }
      {
        qntAulas == '1aula' ?
          <div>
            <text>Selecione dia e horário da primeira aula</text>
            <SelHorAulaAluno
              horaAulaSelec={props.dadosEditar.horaAula1}
              diaAulaSelec={props.dadosEditar.diaAula1}
              onChangeDia={handleSelDia1}
              onChangeHora={handleSelHora1}
              horDispProf={hor1DispProf} />
          </div> : null
      }
      {
        qntAulas == '2aulas' ?
          <div>
            <text>Selecione dia e horário da primeira aula</text>
            <SelHorAulaAluno
              horaAulaSelec={props.dadosEditar.horaAula1}
              diaAulaSelec={props.dadosEditar.diaAula1}
              onChangeDia={handleSelDia1}
              onChangeHora={handleSelHora1}
              horDispProf={hor1DispProf} />
            <text>Selecione dia e horário da segunda aula</text>
            <SelHorAulaAluno
              horaAulaSelec={props.dadosEditar.horaAula2}
              diaAulaSelec={props.dadosEditar.diaAula2}
              onChangeDia={handleSelDia2}
              onChangeHora={handleSelHora2}
              horDispProf={hor2DispProf} />
          </div> : null
      }
      {
        qntAulas == '3aulas' ?
          <div>
            <text>Selecione dia e horário da primeira aula</text>
            <SelHorAulaAluno
              horaAulaSelec={props.dadosEditar.horaAula1}
              diaAulaSelec={props.dadosEditar.diaAula1}
              onChangeDia={handleSelDia1}
              onChangeHora={handleSelHora1}
              horDispProf={hor1DispProf} />
            <text>Selecione dia e horário da segunda aula</text>
            <SelHorAulaAluno
              horaAulaSelec={props.dadosEditar.horaAula2}
              diaAulaSelec={props.dadosEditar.diaAula2}
              onChangeDia={handleSelDia2}
              onChangeHora={handleSelHora2}
              horDispProf={hor2DispProf} />
            <text>Selecione dia e horário da terceira aula</text>
            <SelHorAulaAluno
              horaAulaSelec={props.dadosEditar.horaAula3}
              diaAulaSelec={props.dadosEditar.diaAula3}
              onChangeDia={handleSelDia3}
              onChangeHora={handleSelHora3}
              horDispProf={hor3DispProf} />
          </div> : null
      }
      <button style={styleViews.btnCadastrar} onClick={handleEditarAluno}>Editar Aluno</button>
    </div>
  )

}

export default EditarAluno;