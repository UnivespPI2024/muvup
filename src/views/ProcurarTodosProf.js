import React, { useState, useEffect } from 'react';

import EditarProfessor from './EditarProfessor';

import '../estilos/styleListas.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { getDocs, collection, doc, deleteDoc, query } from 'firebase/firestore/lite';
import { db } from '../firebase'


const ProcurarTodosProf = () => {
  const [listaProf, setListaProf] = useState([])
  const [visibleEditar, setVisibleEditar] = useState(false)
  const [dadosEditar, setDadosEditar] = useState({})

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
      await deleteDoc(doc(db, 'Professores', idProf)).then(window.alert('Professor excluído com sucesso'))
      window.location.reload()
    }
  }

  const editProfessor = async (item) => {
    const qSeg = query(collection(db, 'Professores', item.email, 'segunda'));
    const querySnapshotSeg = await getDocs(qSeg)
    const segunda = querySnapshotSeg.docs.map((doc)=>{ return doc.id})
    
    setDadosEditar({
      
        nome:item.nome,
        email:item.email,
        telefone:item.telefone,
        horSeg:segunda,
        /* horTer:item.diaHorProf.horTerca.map(hor => Object.keys(hor)[0]),
        horQua:item.diaHorProf.horQuarta.map(hor => Object.keys(hor)[0]),
        horQui:item.diaHorProf.horQuinta.map(hor => Object.keys(hor)[0]),
        horSex:item.diaHorProf.horSexta.map(hor => Object.keys(hor)[0]), */
    })
    setVisibleEditar(true)
}

  return (
    <div className={'container'}>
      <div className={'containerLista'}>
        <h2 className={'heading'}>Professores cadastrados:</h2>
        <div className={'listContainer'}>
          {(listaProf.map(item => (
            <div>
              <div key={item.email} className={'item'}>
                <span className={'divider'}>Nome: {item.nome} </span>
                <span className={'divider'}>Email: {item.email} </span>
                <span className={'divider'}>Telefone: {item.telefone} </span>
                <span>
                  <FontAwesomeIcon onClick={() => editProfessor(item)} className={'divider'} icon={faPenToSquare} />
                  <FontAwesomeIcon onClick={() => deleteProf(item.email)} className={'divider'} icon={faTrash} />
                </span>
              </div>
            </div>
          )))}
        </div>
      </div>
      {visibleEditar && <EditarProfessor dadosEditar={dadosEditar} />}
    </div>
  );
};

export default ProcurarTodosProf;