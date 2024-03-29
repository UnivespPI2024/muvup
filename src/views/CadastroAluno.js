import React, { useState, useEffect } from 'react';

import SelHorAulaAluno from '../componentes/SelHorAulaAluno'
import styleViews from '../estilos/styleViews'
import { MAX_ALUNOS } from './constantes';

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
  const [profSelec, setprofSelec] = useState('')
  const [horDispProf1, setHorDispProf1] = useState([])
  const [horDispProf2, setHorDispProf2] = useState([])
  const [horDispProf3, setHorDispProf3] = useState([])


  const [qntAulas, setQntAulas] = useState('');
  const [diaAula1, setDiaAula1] = useState('');
  const [horaAula1, setHoraAula1] = useState('');
  const [diaAula2, setDiaAula2] = useState('');
  const [horaAula2, setHoraAula2] = useState('');
  const [diaAula3, setDiaAula3] = useState('');
  const [horaAula3, setHoraAula3] = useState('');

  useEffect(() => {
    (async () => {
      const professores = collection(db, 'Professores');
      const professoresSnapshot = await getDocs(professores);
      const nomesProfessores = professoresSnapshot.docs.map(doc => doc.data().nome);
      setNomesProf(nomesProfessores)
    })()
  }, [])

  // inclusão no DB de aluno
  const handleCadastro = () => {
    if (nome !== '' && email !== '' && telefone !== '' && endereco !== '' && cidade !== '' && qntAulas !== '') {

      setDoc(doc(db, 'Alunos', email), {
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco,
        cidade: cidade,
        qntAulas: qntAulas,
        diaHorAula: {
          diaAula1: diaAula1,
          horaAula1: horaAula1,
          diaAula2: diaAula2,
          horaAula2: horaAula2,
          diaAula3: diaAula3,
          horaAula3: horaAula3,
        }
      }).then([
        window.alert('Aluno cadastrado com sucesso!'),
        setNome(''), setEmail(''),
        setTelefone(''), setEndereco(''),
        setCidade(''), setQntAulas(''),
        setprofSelec('')]
      )

      if (qntAulas == '1aula') {
        updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
          alunos: arrayUnion(email)
        })
      }
      if (qntAulas == '2aulas') {
        updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
          alunos: arrayUnion(email)
        })
        updateDoc(doc(db, 'Professores', emailProf, diaAula2, horaAula2), {
          alunos: arrayUnion(email)
        })
      }
      if (qntAulas == '3aulas') {
        updateDoc(doc(db, 'Professores', emailProf, diaAula1, horaAula1), {
          alunos: arrayUnion(email)
        })
        updateDoc(doc(db, 'Professores', emailProf, diaAula2, horaAula2), {
          alunos: arrayUnion(email)
        })
        updateDoc(doc(db, 'Professores', emailProf, diaAula3, horaAula3), {
          alunos: arrayUnion(email)
        })
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

    //consulta do email do professor
    const q = query(collection(db, "Professores"), where("nome", "==", profSelec));
    const querySnapshot = await getDocs(q).catch((error) => { console.log('erro', error); })
    querySnapshot.forEach(doc => {
      setEmailProf(doc.data().email)
    });
  };

  // seleção de dia e hora para 3 aulas/semana
  const handleSelDia1 = async (dia) => {
    setDiaAula1(dia)

    const q = query(collection(db, 'Professores', emailProf, dia));
    const querySnapshot = await getDocs(q).catch((error) => { console.log('erro', error); })
    //horarios disponíveis por professor => limite de alunos por aula = MAX_ALUNOS
    const horariosDisp = querySnapshot.docs.map(doc => {
      if(Object.keys(doc.data().alunos).length<MAX_ALUNOS){
        return doc.id
      }
    }).filter(value => value!==undefined);
    setHorDispProf1(horariosDisp)
  }

  const handleSelHora1 = (hora) => {
    console.log('horaAula1', hora);
    setHoraAula1(hora)
  }

  const handleSelDia2 = async (dia) => {
    setDiaAula2(dia)

    const q = query(collection(db, 'Professores', emailProf, dia));
    const querySnapshot = await getDocs(q).catch((error) => { console.log('erro', error); })
    //horarios disponíveis por professor => limite de alunos por aula = MAX_ALUNOS
    const horariosDisp = querySnapshot.docs.map(doc => {
      if(Object.keys(doc.data().alunos).length<MAX_ALUNOS){
        return doc.id
      }
    }).filter(value => value!==undefined);
    setHorDispProf2(horariosDisp)
  }

  const handleSelHora2 = (hora) => {
    setHoraAula2(hora)
  }

  const handleSelDia3 = async (dia) => {
    setDiaAula3(dia)

    const q = query(collection(db, 'Professores', emailProf, dia));
    const querySnapshot = await getDocs(q).catch((error) => { console.log('erro', error); })
    //horarios disponíveis por professor => limite de alunos por aula = MAX_ALUNOS
    const horariosDisp = querySnapshot.docs.map(doc => {
      if(Object.keys(doc.data().alunos).length<MAX_ALUNOS){
        return doc.id
      }
    }).filter(value => value!==undefined);
    setHorDispProf3(horariosDisp)
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
            <text style={styleViews.textoPequeno}>Selecione dia e horário da primeira aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia1} onChangeHora={handleSelHora1} horDispProf={horDispProf1}/>
          </div> : null
      }
      {
        qntAulas == '2aulas' ?
          <div>
            <text style={styleViews.textoPequeno}>Selecione dia e horário da primeira aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia1} onChangeHora={handleSelHora1} horDispProf={horDispProf1}/>
            <text style={styleViews.textoPequeno}>Selecione dia e horário da segunda aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia2} onChangeHora={handleSelHora2} horDispProf={horDispProf2}/>
          </div> : null
      }
      {
        qntAulas == '3aulas' ?
          <div>
            <text style={styleViews.textoPequeno}>Selecione dia e horário da primeira aula::</text>
            <SelHorAulaAluno onChangeDia={handleSelDia1} onChangeHora={handleSelHora1} horDispProf={horDispProf1}/>
            <text style={styleViews.textoPequeno}>Selecione dia e horário da segunda aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia2} onChangeHora={handleSelHora2} horDispProf={horDispProf2}/>
            <text style={styleViews.textoPequeno}>Selecione dia e horário da terceira aula:</text>
            <SelHorAulaAluno onChangeDia={handleSelDia3} onChangeHora={handleSelHora3} horDispProf={horDispProf3}/>
          </div> : null
      }
      <button style={styleViews.btnCadastrar} onClick={handleCadastro}>Cadastrar Aluno</button>
    </div>
  )

}

export default CadastroAluno;
