import React, { useState, useEffect } from 'react';

import styleListas from '../estilos/styleListas'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore/lite';
import { db } from '../firebase'


const ProcurarTodosProf = () => {
  const [listaProf, setListaProf] = useState([])

  useEffect(() => {
    (async () => {
      const professores = collection(db, 'Professores');
      const professoresSnapshot = await getDocs(professores);
      const listaProfessores = professoresSnapshot.docs.map(doc => doc.data());
      setListaProf(listaProfessores)
    })()
  }, [])

  const deleteProf = async (idProf) => {
    const result = window.confirm('Deseja realmente excluir o professor? Essa ação é definitiva!')
    if (result) {
      await deleteDoc(doc(db, 'Professores', idProf)).then(window.alert('Aluno excluído com sucesso'))
      window.location.reload()
    }
  }

  return (
    <div style={styleListas.container}>
      <h2 style={styleListas.heading}>Professores cadastrados</h2>
      <div style={styleListas.listContainer}>
        {(listaProf.map(item => (
          <div key={item.email} style={styleListas.item}>
            <span style={styleListas.divider}>Nome: {item.nome} </span>
            <span style={styleListas.divider}>Email: {item.email} </span>
            <span style={styleListas.divider}>Telefone: {item.telefone} </span>
            <FontAwesomeIcon /* onClick={() => editAluno(item)} */ style={styleListas.divider} icon={faPenToSquare} />
            <FontAwesomeIcon onClick={() => deleteProf(item.email)} style={styleListas.divider} icon={faTrash} />
          </div>
        )))}
      </div>
    </div>
  );
};

export default ProcurarTodosProf;