import React, { useState } from 'react';

import EditarAluno from './EditarAluno';
import { excluirAlunoDoHorarProf } from '../services/excluirBD'
import { excluirUsuario } from '../services/excluirBD'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { db } from '../firebase'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore/lite';

const ProcurarAluno = () => {

    const [searchNome, setSearchNome] = useState('')
    const [alunosEncont, setAlunosEncont] = useState([])
    const [visibleEditar, setVisibleEditar] = useState(false)
    const [dadosEditar, setDadosEditar] = useState({})

    // procurar por aluno no BD
    const searchAluno = async () => {
        setVisibleEditar(false)
        const procuraNormaliz = searchNome.toLowerCase()

        if (procuraNormaliz !== '') {
            alunosEncont.splice(0, alunosEncont.length)
            const alunosCollec = collection(db, 'Alunos');
            const alunosSnapshot = await getDocs(alunosCollec);
            const alunos = []

            alunosSnapshot.forEach((doc) => {
                const nomeNormalizado = doc.data().nome.toLowerCase()
                if (nomeNormalizado.includes(procuraNormaliz)) {
                    alunos.push(doc.data())
                }
            })
            alunos.length === 0 ? window.alert('Nenhum aluno encontrado!') : setAlunosEncont(alunos)

        } else {
            window.alert('O campo de pesquisa não pode estar em branco!')
        }
        setSearchNome('')
    };

    const deleteAluno = async (email) => {
        const result = window.confirm('Deseja realmente excluir o aluno? Essa ação é definitiva!')
        if (result) {
            await deleteDoc(doc(db, 'Alunos', email))
            await excluirUsuario(email).then(window.alert('Aluno excluído com sucesso'), window.location.reload())
        }
    }

    const editAluno = (item) => {
        console.log('item', item);
        setDadosEditar(item)
        setVisibleEditar(true)
    }

    const limparAlunosEncont = () => {
        alunosEncont.splice(0, alunosEncont.length)
    }


    return (
        <div>
            <div className={'cadastroContainer'}>
                <h2 className={'texto'}>Procurar por nome</h2>
                <div className={'formGroup'}>
                    <input
                        className={'inputAluno'}
                        type="text"
                        placeholder="Nome"
                        value={searchNome}
                        onChange={(e) => setSearchNome(e.target.value)}
                    />
                </div>
                <button className={'btnCadastrar'} onClick={searchAluno}>Procurar Aluno</button>
            </div>
            <div className={'container'}>
                <div className={'containerLista'}>
                    <h2 className={'heading'}>Alunos Encontrados</h2>
                    <div className={'listContainer'}>
                        {(alunosEncont.map(item => (
                            <div key={item.email} className={'item'}>
                                <span className={'divider'}>Nome: {item.nome} </span>
                                <span className={'divider'}>Email: {item.email} </span>
                                <span className={'divider'}>Telefone: {item.telefone} </span>
                                <span className={'divider'}>Endereço: {item.endereco} </span>
                                <span className={'divider'}>QntAulas: {item.qntAulas} </span>
                                <FontAwesomeIcon onClick={() => editAluno(item)} className={'divider'} icon={faPenToSquare} />
                                <FontAwesomeIcon onClick={() => deleteAluno(item.email)} className={'divider'} icon={faTrash} />
                            </div>
                        )))}
                    </div>
                </div>
            </div>
            {visibleEditar && <EditarAluno dadosEditar={dadosEditar} setVisibleEditar={setVisibleEditar} limparAlunosEncont={limparAlunosEncont} />}
        </div>
    )

}

export default ProcurarAluno;