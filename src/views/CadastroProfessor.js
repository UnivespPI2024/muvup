import React, { useState } from 'react';

import SelHorAulaProf from '../componentes/SelHorAulaProf';

import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from "firebase/auth";


const CadastroProfessor = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');


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
          perfil: 'professor'
        }).then([
          window.alert('Professor cadastrado com sucesso!'),
          setNome(''), setEmail(''),
          setTelefone('')
        ])

        //gerador de senha aleatória
        function gerarSenha(tamanho) {
          var caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          var senha = "";
          for (var i = 0; i < tamanho; i++) {
            var indiceCaractere = Math.floor(Math.random() * caracteres.length);
            senha += caracteres[indiceCaractere];
          }
          return senha;
        }

        let novaSenha = gerarSenha(6);

        //criar novo usuário com senha aleatória
        const auth = getAuth();
        console.log('novaSenha',novaSenha);
        createUserWithEmailAndPassword(auth, email, novaSenha)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('UserProf criado')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('erro', errorCode, errorMessage);
          });


        //envio de email para redefinição de senha
        sendPasswordResetEmail(auth, email)
          .then(() => {
            console.log('email de redefinição de senha foi enviado');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('erro', errorCode, errorMessage);
          });


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
        alunos: []
      })
    })
    // setHorSegunda(horarios)
  }

  const cboxChangeTerca = (horarios) => {
    horarios.forEach((hor) => {
      setDoc(doc(db, 'Professores', email, 'terça', hor), {
        alunos: []
      })
    })
    // setHorTerca(horarios)
  }

  const cboxChangeQuarta = (horarios) => {
    horarios.forEach((hor) => {
      setDoc(doc(db, 'Professores', email, 'quarta', hor), {
        alunos: []
      })
    })
    // setHorQuarta(horarios)
  }

  const cboxChangeQuinta = (horarios) => {
    horarios.forEach((hor) => {
      setDoc(doc(db, 'Professores', email, 'quinta', hor), {
        alunos: []
      })
    })
    // setHorQuinta(horarios)
  }

  const cboxChangeSexta = (horarios) => {
    horarios.forEach((hor) => {
      setDoc(doc(db, 'Professores', email, 'sexta', hor), {
        alunos: []
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
    <div className={'cadastroContainer'}>
      <h2 className={'texto'}>Cadastro de Professor</h2>
      <div className={'formGroup'}>
        <input
          className={'input'}
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className={'formGroup'}>
        <input
          className={'input'}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={'formGroup'}>
        <input
          className={'input'}
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <h2 className={'texto'}>Horário das aulas:</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div className={'checkBoxContainer'}>
          <h2 className={'textoPequeno'}>Segunda-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeSegunda} handleConf={handleConfSeg}></SelHorAulaProf>
        </div>
        <div className={'checkBoxContainer'}>
          <h2 className={'textoPequeno'}>Terça-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeTerca} handleConf={handleConfTer}></SelHorAulaProf>
        </div>
        <div className={'checkBoxContainer'}>
          <h2 className={'textoPequeno'}>Quarta-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeQuarta} handleConf={handleConfQua}></SelHorAulaProf>
        </div>
        <div className={'checkBoxContainer'}>
          <h2 className={'textoPequeno'}>Quinta-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeQuinta} handleConf={handleConfQui}></SelHorAulaProf>
        </div>
        <div className={'checkBoxContainer'}>
          <h2 className={'textoPequeno'}>Sexta-feira:</h2>
          <SelHorAulaProf onChangeHor={cboxChangeSexta} handleConf={handleConfSex}></SelHorAulaProf>
        </div>
      </div>
      <button className={'btnCadastrar'} onClick={handleCadastroProf}>Cadastrar Professor</button>
    </div>
  )
}

export default CadastroProfessor;
