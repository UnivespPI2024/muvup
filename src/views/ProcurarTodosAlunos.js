import React, { useState, useEffect } from 'react';

import '../estilos/styleListas.css';

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
    <div className={'container'}>
      <div className={'containerLista'}>
        <h2 className={'heading'}>Alunos cadastrados:</h2>
        <div className={'listContainer'}>
          {(listaAlunos.map(item => (
            <div key={item.email} className={'item'}>
              <span className={'divider'}>Nome: {item.nome} </span>
              <span className={'divider'}>Email: {item.email} </span>
              <span className={'divider'}>Telefone: {item.telefone} </span>
              <span className={'divider'}>Endereço: {item.endereco} </span>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default ProcurarTodosAlunos;