import React, { useState } from 'react';

import EditarAluno from './EditarAluno';

import styleViews from '../estilos/styleViews'
import styleListas from '../estilos/styleListas'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { db } from '../firebase'
import { query, collection, where, getDocs, doc, deleteDoc } from 'firebase/firestore/lite';

const ProcurarAluno = () => {

    const [search, setSearch] = useState('')
    const [alunosEncont, setAlunosEncont] = useState([])
    const [visibleEditar, setVisibleEditar] = useState(false)
    const [dadosEditar, setDadosEditar] = useState({})

    // procurar por aluno no BD
    const searchAluno = async () => {
        const alunosCollec = collection(db, 'Alunos');
        const q = query(alunosCollec, where('nome', '==', search));
        const querySnapshot = await getDocs(q);
        const alunos = []
        querySnapshot.forEach((doc) => {
            alunos.push(doc.data())
        })
        console.log('encontrados', alunos)
        setAlunosEncont(alunos)
    };

    const deleteAluno = async (idAluno) => {
        const result = window.confirm('Deseja realmente excluir o aluno? Essa ação é definitiva!')
        if (result) {
            await deleteDoc(doc(db, 'Alunos', idAluno)).then(window.alert('Aluno excluído com sucesso'))
            window.location.reload()
        }
    }

    const editAluno = async (item) => {
        setDadosEditar({
            nome:item.nome,
            email:item.email,
            telefone:item.telefone,
            endereco:item.endereco,
            cidade:item.cidade,
            qntAulas:item.qntAulas
        })
        setVisibleEditar(true)
    }

    return (
        <div>
            <div style={styleViews.cadastroContainer}>
                <h2 style={styleViews.texto}>Procurar por nome</h2>
                <div style={styleViews.formGroup}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button style={styleViews.btnCadastrar} onClick={searchAluno}>Procurar Aluno</button>
            </div>
            <div style={styleListas.container}>
                <h2 style={styleListas.heading}>Alunos Encontrados</h2>
                <div style={styleListas.listContainer}>
                    {(alunosEncont.map(item => (
                        <div key={item.email} style={styleListas.item}>
                            <span style={styleListas.divider}>Nome: {item.nome} </span>
                            <span style={styleListas.divider}>Email: {item.email} </span>
                            <span style={styleListas.divider}>Telefone: {item.telefone} </span>
                            <span style={styleListas.divider}>Endereço: {item.endereco} </span>
                            <FontAwesomeIcon onClick={() => editAluno(item)} style={styleListas.divider} icon={faPenToSquare} />
                            <FontAwesomeIcon onClick={() => deleteAluno(item.email)} style={styleListas.divider} icon={faTrash} />
                        </div>
                    )))}
                </div>
            </div>
            {visibleEditar && <EditarAluno dadosEditar={dadosEditar} />}
        </div>
    )

}

export default ProcurarAluno;