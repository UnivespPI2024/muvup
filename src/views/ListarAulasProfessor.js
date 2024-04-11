import React, { useState, useEffect } from 'react';
import styleListas from '../estilos/styleListas'

import { getDocs, collection, doc, deleteDoc } from 'firebase/firestore/lite';
import { db } from '../firebase'


const ListarAulasProfessor = () => {
  const [listaProf, setListaProf] = useState([])

  useEffect(() => {
    (async () => {
      const professores = collection(db, 'Professores');
      const professoresSnapshot = await getDocs(professores);
      const listaProfessores = professoresSnapshot.docs.map(doc => doc.data());
      setListaProf(listaProfessores)
    })()
  }, [])

  return (
    <div style={styleListas.container}>
      <div style={styleListas.containerLista}>
        <h2 style={styleListas.heading}>Professores cadastrados:</h2>
        <div style={styleListas.listContainer}>
          {(listaProf.map(item => (
            <div>
              <div key={item.email} style={styleListas.item}>
                <span style={styleListas.divider}>Nome: {item.nome} </span>
                <span style={styleListas.divider}>Email: {item.email} </span>
                <span style={styleListas.divider}>Telefone: {item.telefone} </span>
                
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default ListarAulasProfessor;