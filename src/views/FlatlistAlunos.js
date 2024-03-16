import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore/lite';
import { db } from '../firebase'


const FlatListExample = () => {
  const [listaAlunos, setListaAlunos] = useState([])

  useEffect(()=>{
    (async() =>{
      const alunos = collection(db, 'Alunos');
      const alunosSnapshot = await getDocs(alunos);
      const listaAlunos = alunosSnapshot.docs.map(doc => doc.data());
      setListaAlunos(listaAlunos)
    })()
  },[])
  
  console.log(listaAlunos);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Alunos cadastrados</h2>
      <div style={styles.listContainer}>
        {(listaAlunos.map(item => (
        <div key={item.email} style={styles.item}>
          <text>Nome: {item.nome}    Email: {item.email}    Telefone: {item.telefone}    Endereço: {item.endereco}</text>
        </div>
      )))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: 'auto',
    marginBottom:'40px',
    border: '1px solid #ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#6ABC8B',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 15,
    color: 'white',
  },
  listContainer: {
    maxHeight: 200,
    overflowY: 'auto',
    borderTop: '1px solid #ccc',
  },
  item: {
    padding: '10px 15px',
    borderBottom: '1px solid #ccc',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  itemHover: {
    backgroundColor: '#f0f0f0',
  },
};

export default FlatListExample;