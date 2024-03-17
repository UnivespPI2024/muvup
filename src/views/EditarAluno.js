import React, { useState } from 'react';

import SelHorAulaAluno from '../componentes/SelHorAulaAluno'
import styleViews from '../estilos/styleViews'

import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore/lite';

const EditarAluno = (props) => {
  const [qntAulas, setQntAulas] = useState('');
  const [diaAula1, setDiaAula1] = useState('');
  const [horaAula1, setHoraAula1] = useState('');
  const [diaAula2, setDiaAula2] = useState('');
  const [horaAula2, setHoraAula2] = useState('');
  const [diaAula3, setDiaAula3] = useState('');
  const [horaAula3, setHoraAula3] = useState('');

  const [nome, setNome] = useState(props.dadosEditar.nome);
  const [email, setEmail] = useState(props.dadosEditar.email);
  const [telefone, setTelefone] = useState(props.dadosEditar.telefone);
  const [endereco, setEndereco] = useState(props.dadosEditar.endereco);
  const [cidade, setCidade] = useState(props.dadosEditar.cidade);

  // inclusão no DB de aluno
  const handleCadastro = () => {
    if(nome!='' && email!='' && telefone!='' && endereco!='' && cidade!='' && qntAulas!=''){
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Telefone:', telefone);
      console.log('Endereço:', endereco);
      console.log('Cidade:', cidade);
  
      setDoc(doc(db, 'Alunos', email), {
        nome: nome,
        email: email,
        telefone: telefone,
        endereco: endereco,
        cidade: cidade,
        qntAulas: qntAulas,
        diaHorAula:{
          diaAula1: diaAula1,
          horaAula1: horaAula1,
          diaAula2: diaAula2,
          horaAula2: horaAula2,
          diaAula3: diaAula3,
          horaAula3: horaAula3,
        }
      }).then([
        window.alert('Aluno salvo com sucesso!'),
        setNome(''), setEmail(''),
        setTelefone(''),setEndereco(''),
        setCidade(''), setQntAulas('')]
      )
    }else{
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
  const handleSelDia1 = (dia) =>{
    setDiaAula1(dia)
  }

  const handleSelHora1 = (hora) =>{
    setHoraAula1(hora)
  }

  const handleSelDia2 = (dia) =>{
    setDiaAula2(dia)
  }

  const handleSelHora2 = (hora) =>{
    setHoraAula2(hora)
  }

  const handleSelDia3 = (dia) =>{
    setDiaAula3(dia)
  }

  const handleSelHora3 = (hora) =>{
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
          type="email"
          placeholder="Email"
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
          value={props.dadosEditar.qntAulas}
          onChange={handleSelectQntAulas}>
          <option value="">Quantidade de aulas na semana</option>
          <option value="1aula">1 aula</option>
          <option value="2aulas">2 aulas</option>
          <option value="3aulas">3 aulas</option>
        </select>
      </div>
      {
        qntAulas=='1aula'?
        <div>
          <text>Selecione dia e horário da primeira aula</text>
          <SelHorAulaAluno onChangeDia={handleSelDia1} onChangeHora={handleSelHora1}/>
        </div>:null
      }
      {
        qntAulas=='2aulas'?
        <div>
          <text>Selecione dia e horário da primeira aula</text>
          <SelHorAulaAluno onChangeDia={handleSelDia1} onChangeHora={handleSelHora1}/>
          <text>Selecione dia e horário da segunda aula</text>
          <SelHorAulaAluno onChangeDia={handleSelDia2} onChangeHora={handleSelHora2}/>
        </div>:null
      }
      {
        qntAulas=='3aulas'?
        <div>
          <text>Selecione dia e horário da primeira aula</text>
          <SelHorAulaAluno onChangeDia={handleSelDia1} onChangeHora={handleSelHora1}/>
          <text>Selecione dia e horário da segunda aula</text>
          <SelHorAulaAluno onChangeDia={handleSelDia2} onChangeHora={handleSelHora2}/>
          <text>Selecione dia e horário da terceira aula</text>
          <SelHorAulaAluno onChangeDia={handleSelDia3} onChangeHora={handleSelHora3}/>
        </div>:null
      }
      <button style={styleViews.btnCadastrar} onClick={handleCadastro}>Editar Aluno</button>
    </div>
  )

}

export default EditarAluno;