import React, { useState, useEffect } from 'react';

import SelHorAulaAluno from '../componentes/SelHorAulaAluno'
import { consultaAulasDispProf } from '../services/consultasBD'
import { incluirEdicaoAlunoNoHorarioProf } from '../services/incluirBD'
import { criarUsuario } from '../services/loginBD'

import styleViews from '../estilos/styleViews'

import { db } from '../firebase'
import { setDoc, doc, collection, getDocs, query, where, updateDoc, arrayUnion } from 'firebase/firestore/lite';

const CadastroAluno = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [emailProf, setEmailProf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');

  const [nomesProf, setNomesProf] = useState([])
  const [profSelec, setProfSelec] = useState('')
  const [hor1DispProf, setHor1DispProf] = useState([])
  const [hor2DispProf, setHor2DispProf] = useState([])
  const [hor3DispProf, setHor3DispProf] = useState([])

  const [qntAulas, setQntAulas] = useState('');
  const [diaAula1, setDiaAula1] = useState('');
  const [horaAula1, setHoraAula1] = useState('');
  const [diaAula2, setDiaAula2] = useState('');
  const [horaAula2, setHoraAula2] = useState('');
  const [diaAula3, setDiaAula3] = useState('');
  const [horaAula3, setHoraAula3] = useState('');

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
  const handleCadastro = async () => {
    if (nome !== '' && email !== '' && telefone !== '' && endereco !== '' && cidade !== '' && qntAulas !== '') {
      if ((qntAulas === '1aula' && horaAula1 !== '') ||
        (qntAulas === '2aulas' && horaAula1 !== '' && horaAula2 !== '') ||
        (qntAulas === '3aulas' && horaAula1 !== '' && horaAula2 !== '' && horaAula3 !== '')) {
        try {
          await criarUsuario(email)

          setDoc(doc(db, 'Alunos', email), {
            nome: nome, email: email, telefone: telefone, endereco: endereco,
            cidade: cidade, qntAulas: qntAulas, profDoAluno: emailProf,perfil: 'aluno',
            diaHorAula: {
              diaAula1: diaAula1, diaAula2: diaAula2, diaAula3: diaAula3,
              horaAula1: horaAula1, horaAula2: horaAula2, horaAula3: horaAula3,
            }})

          const dadosAluno = {
            nome, email, qntAulas, diaAula1, diaAula2, diaAula3, horaAula1, horaAula2, horaAula3
          }

          incluirEdicaoAlunoNoHorarioProf(emailProf, dadosAluno)

          window.alert('Aluno cadastrado com sucesso!')
          setNome(''); setEmail('');
          setTelefone(''); setEndereco('');
          setCidade(''); setQntAulas('');
          setProfSelec('')
          
        } catch(error) {
          console.log('error.code',error.code);
          if(error.code==='auth/email-already-in-use'){
            window.alert('O e-mail já existe no cadastro')
          }
          if(error.code==='auth/invalid-email'){
            window.alert('E-mail inválido')
          }
        }
      } else {
        window.alert('Preencha todos os campos obrigatórios!')
      }
    } else {
      window.alert('Preencha todos os campos obrigatórios!')
    }
  };

  const handleSelectProf = (event) => {
    setProfSelec(event.target.value);
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
    if (dia !== '') {
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
    if (dia !== '') {
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
    if (dia !== '') {
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
      <h2 style={styleViews.texto}>Cadastro de Aluno</h2>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.inputAluno}
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.inputAluno}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.inputAluno}
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.inputAluno}
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />
      </div>
      <div style={styleViews.formGroup}>
        <input
          style={styleViews.inputAluno}
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
            <text style={styleViews.textoPequeno}>Selecione dia e horário da primeira aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia1} onChangeHora={handleSelHora1} horDispProf={hor1DispProf} />
          </div> : null
      }
      {
        qntAulas == '2aulas' ?
          <div>
            <text style={styleViews.textoPequeno}>Selecione dia e horário da primeira aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia1} onChangeHora={handleSelHora1} horDispProf={hor1DispProf} />
            <text style={styleViews.textoPequeno}>Selecione dia e horário da segunda aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia2} onChangeHora={handleSelHora2} horDispProf={hor2DispProf} />
          </div> : null
      }
      {
        qntAulas == '3aulas' ?
          <div>
            <text style={styleViews.textoPequeno}>Selecione dia e horário da primeira aula::</text>
            <SelHorAulaAluno onChangeDia={handleSelDia1} onChangeHora={handleSelHora1} horDispProf={hor1DispProf} />
            <text style={styleViews.textoPequeno}>Selecione dia e horário da segunda aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia2} onChangeHora={handleSelHora2} horDispProf={hor2DispProf} />
            <text style={styleViews.textoPequeno}>Selecione dia e horário da terceira aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia3} onChangeHora={handleSelHora3} horDispProf={hor3DispProf} />
          </div> : null
      }
      <button style={styleViews.btnCadastrar} onClick={handleCadastro}>Cadastrar Aluno</button>
    </div>
  )

}

export default CadastroAluno;
