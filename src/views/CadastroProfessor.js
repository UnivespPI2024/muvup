import React, { useState } from 'react';

import styleViews from '../estilos/styleViews'
import SelHorAulaProf from '../componentes/SelHorAulaProf';

import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore/lite';

const CadastroProfessor = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

 /*  const [horSegunda, setHorSegunda] = useState([]);
  const [horTerca, setHorTerca] = useState([]);
  const [horQuarta, setHorQuarta] = useState([]);
  const [horQuinta, setHorQuinta] = useState([]);
  const [horSexta, setHorSexta] = useState([]); */

  const [confirmHorSeg, setConfirmHorSeg] = useState();
  const [confirmHorTer, setConfirmHorTer] = useState();
  const [confirmHorQua, setConfirmHorQua] = useState();
  const [confirmHorQui, setConfirmHorQui] = useState();
  const [confirmHorSex, setConfirmHorSex] = useState();

  // inclusão no DB de professor
  const handleCadastroProf = async () => {
    if (nome !== '' && email !== '' && telefone !== '') {
      if (confirmHorSeg === true && confirmHorTer === true && confirmHorQua === true && confirmHorQui === true && confirmHorSex === true) {
        await setDoc(doc(db, 'Professores', email), {
          nome: nome,
          email: email,
          telefone: telefone,
          /* segunda: horSegunda,
          terca: horTerca,
          quarta: horQuarta,
          quinta: horQuinta,
          sexta: horSexta */

        }).then([
          window.alert('Professor cadastrado com sucesso!'),
          setNome(''), setEmail(''),
          setTelefone('')]
        )
      } else {
        window.alert('Confirme todos dias da semana!')
      }
    } else {
      window.alert('Preencha todos os campos obrigatórios!')
    }
    window.location.reload()
  }


  const cboxChangeSegunda = (horarios) => {
    console.log('horarios', horarios);
    horarios.forEach((hor) => {
      setDoc(doc(db, 'Professores', email, 'segunda', hor), {
        alunos:[]
      })
    })
    // setHorSegunda(horarios)
  }

  const cboxChangeTerca = (horarios) => {
    horarios.forEach((hor) => {
      setDoc(doc(db, 'Professores', email, 'terca', hor), {
        alunos:[]
      })
    })
    // setHorTerca(horarios)
  }

  const cboxChangeQuarta = (horarios) => {
    horarios.forEach((hor) => {
      setDoc(doc(db, 'Professores', email, 'quarta', hor), {
        alunos:[]
      })
    })
    // setHorQuarta(horarios)
  }

  const cboxChangeQuinta = (horarios) => {
    horarios.forEach((hor) => {
      setDoc(doc(db, 'Professores', email, 'quinta', hor), {
        alunos:[]
      })
    })
    // setHorQuinta(horarios)
  }

  const cboxChangeSexta = (horarios) => {
    horarios.forEach((hor) => {
      setDoc(doc(db, 'Professores', email, 'sexta', hor), {
        alunos:[]
      })
    })
    // setHorSexta(horarios)
  }

  const handleConfSeg = (confirm) => {
    setConfirmHorSeg(confirm)
  }

  const handleConfTer = (confirm) => {
    setConfirmHorTer(confirm)
  }

  const handleConfQua = (confirm) => {
    setConfirmHorQua(confirm)
  }

  const handleConfQui = (confirm) => {
    setConfirmHorQui(confirm)
  }

  const handleConfSex = (confirm) => {
    setConfirmHorSex(confirm)
  }

  return (
    <div style={styleViews.cadastroContainer}>
      <h2 style={styleViews.texto}>Cadastro de Professor</h2>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.inputProf}
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.inputProf}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.inputProf}
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <h2 style={styleViews.texto}>Horário das aulas:</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Segunda-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeSegunda} handleConf={handleConfSeg}></SelHorAulaProf>
        </div>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Terça-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeTerca} handleConf={handleConfTer}></SelHorAulaProf>
        </div>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Quarta-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeQuarta} handleConf={handleConfQua}></SelHorAulaProf>
        </div>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Quinta-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeQuinta} handleConf={handleConfQui}></SelHorAulaProf>
        </div>
        <div style={styleViews.checkBoxContainer}>
          <h2 style={styleViews.textoPequeno}>Sexta-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeSexta} handleConf={handleConfSex}></SelHorAulaProf>
        </div>
      </div>
      <button style={styleViews.btnCadastrar} onClick={handleCadastroProf}>Cadastrar Professor</button>
    </div>
  )
}

export default CadastroProfessor;
