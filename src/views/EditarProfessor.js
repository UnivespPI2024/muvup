import React, { useState } from 'react';

import SelHorAulaProf from '../componentes/SelHorAulaProf';

import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore/lite';

const EditarProfessor = (props) => {

    const [nome, setNome] = useState(props.dadosEditar.nome);
    const [email, setEmail] = useState(props.dadosEditar.email);
    const [telefone, setTelefone] = useState(props.dadosEditar.telefone);

    const [horSegunda, setHorSegunda] = useState([]);
    const [horTerca, setHorTerca] = useState([]);
    const [horQuarta, setHorQuarta] = useState([]);
    const [horQuinta, setHorQuinta] = useState([]);
    const [horSexta, setHorSexta] = useState([]);

    const [confirmHorSeg, setConfirmHorSeg] = useState();
    const [confirmHorTer, setConfirmHorTer] = useState();
    const [confirmHorQua, setConfirmHorQua] = useState();
    const [confirmHorQui, setConfirmHorQui] = useState();
    const [confirmHorSex, setConfirmHorSex] = useState();

    // inclusão no DB de professor
    const handleEditarProf = async () => {
        if (nome !== '' && email !== '' && telefone !== '') {
            if (confirmHorSeg === true && confirmHorTer === true && confirmHorQua === true && confirmHorQui === true && confirmHorSex === true) {
                await setDoc(doc(db, 'Professores', email), {
                    nome: nome,
                    email: email,
                    telefone: telefone,
                    diaHorProf: {
                        horSegunda: horSegunda,
                        horTerca: horTerca,
                        horQuarta: horQuarta,
                        horQuinta: horQuinta,
                        horSexta: horSexta
                    }
                }).then([
                    window.alert('Professor editado com sucesso!'),
                    setNome(''), setEmail(''),
                    setTelefone('')]
                )
            } else {
                window.alert('Confirme todos dias da semana!')
            }
        } else {
            window.alert('Preencha todos os campos obrigatórios!')
        }
        window.location.reload()
    }


    const cboxChangeSegunda = (horarios) => {
        setHorSegunda(horarios)
    }

    const cboxChangeTerca = (horarios) => {
        setHorTerca(horarios)
    }

    const cboxChangeQuarta = (horarios) => {
        setHorQuarta(horarios)
    }

    const cboxChangeQuinta = (horarios) => {
        setHorQuinta(horarios)
    }

    const cboxChangeSexta = (horarios) => {
        setHorSexta(horarios)
    }

    const handleConfSeg = (confirm) => {
        setConfirmHorSeg(confirm)
    }

    const handleConfTer = (confirm) => {
        setConfirmHorTer(confirm)
    }

    const handleConfQua = (confirm) => {
        setConfirmHorQua(confirm)
    }

    const handleConfQui = (confirm) => {
        setConfirmHorQui(confirm)
    }

    const handleConfSex = (confirm) => {
        setConfirmHorSex(confirm)
    }

    return (
        <div className={'cadastroContainer'}>
            <h2 className={'texto'}>Editar professor:</h2>
            <div className={'formGroup'}>
                <input
                    className={'inputProf'}
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
            <div className={'formGroup'}>
                <input
                    className={'inputProf'}
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={'formGroup'}>
                <input
                    className={'inputProf'}
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
            </div>
            <h2 className={'texto'}>Horário das aulas:</h2>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className={'checkBoxContainer'}>
                    <h2 className={'textoPequeno'}>Segunda-feira:</h2>
                    <SelHorAulaProf
                        onChangeHor={cboxChangeSegunda}
                        handleConf={handleConfSeg}
                        horariosEditar={props.dadosEditar.horSeg}>
                    </SelHorAulaProf>
                </div>
                <div className={'checkBoxContainer'}>
                    <h2 className={'textoPequeno'}>Terça-feira:</h2>
                    <SelHorAulaProf
                        onChangeHor={cboxChangeTerca}
                        handleConf={handleConfTer}
                        horariosEditar={props.dadosEditar.horTer}>
                    </SelHorAulaProf>
                </div>
                <div className={'checkBoxContainer'}>
                    <h2 className={'textoPequeno'}>Quarta-feira:</h2>
                    <SelHorAulaProf
                        onChangeHor={cboxChangeQuarta}
                        handleConf={handleConfQua}
                        horariosEditar={props.dadosEditar.horQua}>
                    </SelHorAulaProf>
                </div>
                <div className={'checkBoxContainer'}>
                    <h2 className={'textoPequeno'}>Quinta-feira:</h2>
                    <SelHorAulaProf
                        onChangeHor={cboxChangeQuinta}
                        handleConf={handleConfQui}
                        horariosEditar={props.dadosEditar.horQui}>
                    </SelHorAulaProf>
                </div>
                <div className={'checkBoxContainer'}>
                    <h2 className={'textoPequeno'}>Sexta-feira:</h2>
                    <SelHorAulaProf
                        onChangeHor={cboxChangeSexta}
                        handleConf={handleConfSex}
                        horariosEditar={props.dadosEditar.horSex}>
                    </SelHorAulaProf>
                </div>
            </div>
            <button className={'btnCadastrar'} onClick={handleEditarProf}>Cadastrar Professor</button>
        </div>
    )
}

export default EditarProfessor;
