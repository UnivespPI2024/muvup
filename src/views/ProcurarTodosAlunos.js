import React, { useState, useEffect } from 'react';

import styleListas from '../estilos/styleListas'

import { getDocs, collection } from 'firebase/firestore/lite';
import { db } from '../firebase'


const ProcurarTodosAlunos = () => {
  const [listaAlunos, setListaAlunos] = useState([])

  useEffect(() => {
    (async () => {
      const alunos = collection(db, 'Alunos');
      const alunosSnapshot = await getDocs(alunos);
      const listaAlunos = alunosSnapshot.docs.map(doc => doc.data());
      setListaAlunos(listaAlunos)
    })()
  }, [])

  return (
    <div style={styleListas.container}>
      <h2 style={styleListas.heading}>Alunos cadastrados</h2>
      <div style={styleListas.listContainer}>
        {(listaAlunos.map(item => (
          <div key={item.email} style={styleListas.item}>
            <span style={styleListas.divider}>Nome: {item.nome} </span>
            <span style={styleListas.divider}>Email: {item.email} </span>
            <span style={styleListas.divider}>Telefone: {item.telefone} </span>
            <span style={styleListas.divider}>Endereço: {item.endereco} </span>
          </div>
        )))}
      </div>
    </div>
  );
};

export default ProcurarTodosAlunos;