import React, { useState } from 'react';

import SelHorAulaAluno from '../componentes/SelHorAulaAluno'
import { consultaAulasDispProf } from '../services/consultasBD'
import { excluirAlunoDoHorarProf } from '../services/excluirBD'
import { incluirEdicaoAlunoDoHorarioProf } from '../services/incluirBD'
import styleViews from '../estilos/styleViews'

import { db } from '../firebase'
import { doc,  updateDoc,  } from 'firebase/firestore/lite';

const EditarAluno = (props) => {
  const [nome, setNome] = useState(props.dadosEditar.nome);
  const [email, setEmail] = useState(props.dadosEditar.email);
  const [emailProf, setEmailProf] = useState(props.dadosEditar.profDoAluno);
  const [telefone, setTelefone] = useState(props.dadosEditar.telefone);
  const [endereco, setEndereco] = useState(props.dadosEditar.endereco);
  const [cidade, setCidade] = useState(props.dadosEditar.cidade);

  const [qntAulas, setQntAulas] = useState(props.dadosEditar.qntAulas);
  const [diaAula1, setDiaAula1] = useState('');
  const [horaAula1, setHoraAula1] = useState('');
  const [diaAula2, setDiaAula2] = useState('');
  const [horaAula2, setHoraAula2] = useState('');
  const [diaAula3, setDiaAula3] = useState('');
  const [horaAula3, setHoraAula3] = useState('');
  const [hor1DispProf, setHor1DispProf] = useState([])
  const [hor2DispProf, setHor2DispProf] = useState([])
  const [hor3DispProf, setHor3DispProf] = useState([])

  // inclusão no DB de aluno
  const handleEditarAluno = () => {
    if (nome != '' && email != '' && telefone != '' && endereco != '' && cidade != '' && qntAulas != '') {
      const dadosAluno ={
        nome, qntAulas, diaAula1, diaAula2, diaAula3, horaAula1, horaAula2, horaAula3
      }
      
      incluirEdicaoAlunoDoHorarioProf(emailProf,dadosAluno)
      
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
        setCidade(''), setQntAulas('')]
      )

      // await excluirAlunoDoHorarProf(emailProf, email)
      

    } else {
      window.alert('Preencha todos os campos obrigatórios!')
    }
  };

  // seleção qnt de aulas
  const handleSelectQntAulas = (event) => {
    setQntAulas(event.target.value);
    setDiaAula1(''); setHoraAula1('')
    setDiaAula2(''); setHoraAula2('')
    setDiaAula3(''); setHoraAula3('')
  };

  // seleção de dia e hora para 3 aulas/semana
  const handleSelDia1 = async (dia) => {
    setDiaAula1(dia)
    const resultado = await consultaAulasDispProf(emailProf, dia)
    setHor1DispProf(resultado)
  }

  const handleSelHora1 = (hora) => {
    setHoraAula1(hora)
  }

  const handleSelDia2 = async (dia) => {
    setDiaAula2(dia)
    const resultado = await consultaAulasDispProf(emailProf, dia)
    setHor2DispProf(resultado)
  }

  const handleSelHora2 = (hora) => {
    setHoraAula2(hora)
  }

  const handleSelDia3 = async (dia) => {
    setDiaAula3(dia)
    const resultado = await consultaAulasDispProf(emailProf, dia)
    setHor3DispProf(resultado)
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
          value={qntAulas}
          onChange={handleSelectQntAulas}>
          <option value="">Quantidade de aulas na semana</option>
          <option value="1aula">1 aula</option>
          <option value="2aulas">2 aulas</option>
          <option value="3aulas">3 aulas</option>
        </select>
      </div>
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