import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Calendar from 'react-calendar';
import { MAX_DIAS_REMARC, MAX_ALUNOS } from '../constantes';

import 'react-calendar/dist/Calendar.css';
import '../estilos/customCalendar.css';
import '../estilos/styleViews.css'


import { db } from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where, doc, arrayUnion, updateDoc, setDoc } from 'firebase/firestore/lite';

const ReagendarAluno = () => {

    const diasDaSemana = {
        "domingo": 0, "segunda": 1, "terça": 2, "quarta": 3,
        "quinta": 4, "sexta": 5, "sabado": 6
    };

    const diasDaSemana2 = {
        0: 'domingo', 1: 'segunda', 2: 'terça', 3: 'quarta',
        4: 'quinta', 5: 'sexta', 6: 'sabado',
    };

    const auth = getAuth()

    const [listaDiaHorAluno, setListaDiaHorAluno] = useState([])
    const [listaHorDisp, setListaHorDisp] = useState([])
    const [diaHorSelecAtual, setDiaHorSelecAtual] = useState('')
    const [dataCalendarioRemarc, setDataCalendarioRemarc] = useState('')
    const [horDispSelec, setHorDispSelec] = useState('')

    const [nomesProf, setNomesProf] = useState([])
    const [profSelec, setprofSelec] = useState('')
    const [emailProf, setEmailProf] = useState('');
    const [emailAluno, setEmailAluno] = useState('');
    const [nomeAluno, setNomeAluno] = useState('');
    const [telefoneAluno, setTelefoneAluno] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmailAluno(user.email)
            } else {
                setEmailAluno('')
            }
        });
    }, [])

    useEffect(() => {
        (async () => {
            const qNomeAluno = query(collection(db, "Alunos"), where("email", "==", emailAluno));
            const querySnapshotNome = await getDocs(qNomeAluno).catch((error) => { console.log('erro', error); })
            querySnapshotNome.forEach(doc => {
                console.log('nome', doc.data().nome);
                console.log('telefone', doc.data().telefone);
                setNomeAluno(doc.data().nome)
                setTelefoneAluno(doc.data().telefone)
            });
        })()
    }, [emailAluno])

    const enviarMsgWhatsApp = async (diaRemarc, horRemarc, profSelec) => {
        console.log('entrou no enviar msg')
        try {
            const response = await axios.post('http://localhost:5000/send-whatsapp', {
                to: `+55${telefoneAluno}`,
                message: `A sua aula foi remarcada para o dia: ${diaRemarc} às: 
                ${horRemarc.slice(-2)} horas, com o professor: ${profSelec}`
            });
            console.log(`Mensagem enviada com sucesso! SID: ${response.data.sid}`);
        } catch (error) {
            console.log(`Erro: ${error.message}`);
        }
    }

    function formatarData(data) {
        const meses = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];

        // Dividir a data na string dd-mm-aaaa
        const [dia, mes, ano] = data.split('-');

        // Formatar a data no formato "dd de mês de aaaa"
        return `${dia} de ${meses[parseInt(mes) - 1]} de ${ano}`;
    }

    const handleReagendar = async () => {
        const diaAtual = diaHorSelecAtual.split(',')[0].replace(/\//g, '-')
        console.log('diaAtual', diaAtual);
        const horAtual = 'hor' + diaHorSelecAtual.split(' ')[3].substring(0, 2)
        const diaRemarc = dataCalendarioRemarc.getDate() + '-' + (dataCalendarioRemarc.getMonth() + 1) + '-' + dataCalendarioRemarc.getFullYear()
        const horRemarc = horDispSelec
        const diaFormatRemarc = formatarData(diaRemarc)
        let flagIdRemarc = false
        let flagIdDesmarc = false

        //consulta se o nó AulasReagendadas existe no BD
        const aulasReagendREf = query(collection(db, 'Professores', emailProf, 'AulasReagendadas'))
        const docSnapAulasReagend = await getDocs(aulasReagendREf)
        docSnapAulasReagend.forEach((doc) => {
            if (doc.id == diaRemarc) {
                flagIdRemarc = true
            }
        })

        // atualiza nó AulasReagendadas se já existir ou cria nó se não existir
        if (flagIdRemarc) {
            updateDoc(doc(db, 'Professores', emailProf, 'AulasReagendadas', diaRemarc), {
                [horRemarc]: arrayUnion({ nomeAluno, status: 'Remarcada' })
            })
        } else {
            setDoc(doc(db, 'Professores', emailProf, 'AulasReagendadas', diaRemarc), {
                [horRemarc]: arrayUnion({ nomeAluno, status: 'Remarcada' })
            })
        }

        //consulta se o nó AulasDesmarcadas existe no BD
        const aulasDesmarcREf = query(collection(db, 'Professores', emailProf, 'AulasDesmarcadas'))
        const docSnapAulasDesmarc = await getDocs(aulasDesmarcREf)
        docSnapAulasDesmarc.forEach((doc) => {
            if (doc.id == diaAtual) {
                flagIdDesmarc = true
            }
        })

        // atualiza nó AulasDesmarcadas se já existir ou cria nó se não existir
        if (flagIdDesmarc) {
            console.log('entrou aqui');
            updateDoc(doc(db, 'Professores', emailProf, 'AulasDesmarcadas', diaAtual), {
                [horAtual]: arrayUnion({ nomeAluno, status: 'Desmarcada' })
            }).then([
                window.alert('Dia e horário remarcado com sucesso!'),
            ])
            enviarMsgWhatsApp(diaFormatRemarc, horRemarc, profSelec)
        } else {
            setDoc(doc(db, 'Professores', emailProf, 'AulasDesmarcadas', diaAtual), {
                [horAtual]: arrayUnion({ nomeAluno, status: 'Desmarcada' })
            }).then([
                window.alert('Dia e horário remarcado com sucesso!'),
                enviarMsgWhatsApp(diaFormatRemarc, horRemarc, profSelec)
            ])
        }

        window.location.reload()
    }

    // máxima data permitida para remarcar
    const maxData = new Date();
    maxData.setDate(maxData.getDate() + MAX_DIAS_REMARC);

    // função para desabilitar os fins de semana
    const tileDisabled = ({ date }) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    // formatação do calendário
    const diasFormatados = (locale, date) => {
        const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return weekdays[date.getDay()];
    };

    const handleSelectDiaHorAula = async (event) => {
        setDiaHorSelecAtual(event.target.value)
        setprofSelec('')
        setDataCalendarioRemarc('')
        setHorDispSelec('')
    }

    const handleSelectProf = async (event) => {
        setprofSelec(event.target.value);
        setDataCalendarioRemarc('')
        setHorDispSelec('')

        //consulta do email do professor
        const qEmail = query(collection(db, "Professores"), where("nome", "==", event.target.value));
        const querySnapshotEmail = await getDocs(qEmail).catch((error) => { console.log('erro', error); })
        querySnapshotEmail.forEach(doc => {
            setEmailProf(doc.data().email)
        });
    };

    const handleHorSelect = (event) => {
        setHorDispSelec(event.target.value)
    }

    const onChangeDataCalendario = async (data) => {
        setDataCalendarioRemarc(data);
        setHorDispSelec('')
        setListaHorDisp([''])
        const dia = diasDaSemana2[data.getDay()];
        const diaSelec = data.getDate() + '-' + (data.getMonth() + 1) + '-' + data.getFullYear()


        const verificaQntAulas = async (docHor) => {

            let qntAulasRemarc = 0
            let qntAulasDesmarc = 0

            //consulta se no dia e horário selecionado já existem remarcações
            const qHorariosRemarc = query(collection(db, 'Professores', emailProf, 'AulasReagendadas'));
            const querySnapshotHorRemarc = await getDocs(qHorariosRemarc).catch((error) => { console.log('erro', error); })
            querySnapshotHorRemarc.forEach((docDia) => {
                if (docDia.id == diaSelec) {
                    if (Object.keys(docDia.data()).includes(docHor.id)) {
                        const idx = Object.keys(docDia.data()).indexOf(docHor.id)
                        qntAulasRemarc = Object.values(docDia.data())[idx].length
                    }
                }
            })

            //consulta se no dia e horário selecionado existem desistências
            const qHorariosDesmarc = query(collection(db, 'Professores', emailProf, 'AulasDesmarcadas'));
            const querySnapshotHorDesmarc = await getDocs(qHorariosDesmarc).catch((error) => { console.log('erro', error); })
            querySnapshotHorDesmarc.forEach((docDia) => {
                if (docDia.id == diaSelec) {
                    if (Object.keys(docDia.data()).includes(docHor.id)) {
                        const idx = Object.keys(docDia.data()).indexOf(docHor.id)
                        qntAulasDesmarc = Object.values(docDia.data())[idx].length
                    }
                }
            })

            if (Object.keys(docHor.data().alunos).length < MAX_ALUNOS - qntAulasRemarc + qntAulasDesmarc) {
                return docHor.id
            }
        }

        //consulta dos horarios disponíveis por professor => limite de alunos por aula = MAX_ALUNOS
        const qHorarios = query(collection(db, 'Professores', emailProf, dia));
        const querySnapshot = await getDocs(qHorarios).catch((error) => { console.log('erro', error); })
        const horariosDisp = await Promise.all(querySnapshot.docs.map(async docHor => {
            return await verificaQntAulas(docHor)
        }))
        setListaHorDisp(horariosDisp.filter(value => value !== undefined))
    }

    useEffect(() => {
        (async () => {
            //função que verifica o dia da semana que corresponde a um determinado dia da semana
            function datasPorDiaSemana(diaDaSemanaStr, hora) {

                const diaDaSemana = diasDaSemana[diaDaSemanaStr];
                const datas = [];
                const hoje = new Date();
                const diaAlvo = diaDaSemana;


                for (let i = 0; i < MAX_DIAS_REMARC; i++) {
                    const diaAtual = new Date(hoje.getTime() + i * 24 * 60 * 60 * 1000);
                    if (diaAtual.getDay() === diaAlvo) {
                        const dataFormatada = diaAtual.getDate() + '/' +
                            (diaAtual.getMonth() + 1) + '/' + diaAtual.getFullYear() +
                            ', ' + diaDaSemanaStr + '-feira' + ' às ' + hora + 'h';
                        datas.push(dataFormatada);
                    }
                }
                return datas;
            }

            //consulta no BD dos dias e horários de um aluno
            const q = query(collection(db, 'Alunos'), where('email', '==', emailAluno))
            const diaHorAlunoSnapshot = await getDocs(q)
            const listahorarios = diaHorAlunoSnapshot.docs.map(doc => doc.data().diaHorAula);
            const listaNormalizada = listahorarios[0]

            // junção de keys no mesmo array ex. diaAula1 && horaAula1
            const keysConcatenadas = [['diaAula1', 'horaAula1'], ['diaAula2', 'horaAula2'], ['diaAula3', 'horaAula3']]; // Pares de chaves que você quer concatenar
            const listaDiaHor = keysConcatenadas.map(([key1, key2]) => {
                if (listaNormalizada) {
                    if (listaNormalizada.hasOwnProperty(key1) && listaNormalizada.hasOwnProperty(key2)) {
                        return listaNormalizada[key1] + ' ' + listaNormalizada[key2].substring(3, 5);
                    }
                }
                return '';
            });

            // chamada da função que monta os dias do mês com base nos dias da semana
            const listaDataDiaHor = listaDiaHor.map((diaHor) => {
                const partes = diaHor.split(' ');
                const dia = partes[0]
                const hora = partes[1]
                return datasPorDiaSemana(dia, hora)
            })

            // as duas funções abaixo fazem a ordenação do array com datas
            function toDate(dataString) {
                const partes1 = dataString.split(',')
                const partes2 = partes1[0].split("/");
                return new Date(partes2[2], partes2[1] - 1, partes2[0]);
            }

            function compararDatas(a, b) {
                var dataA = toDate(a);
                var dataB = toDate(b);
                if (dataA < dataB) return -1;
                if (dataA > dataB) return 1;
                return 0;
            }

            // concatenação dos array formados para cada dia da semana
            const listaDataDiaHorNorm = [].concat(...listaDataDiaHor)
            listaDataDiaHorNorm.sort(compararDatas)
            setListaDiaHorAluno(listaDataDiaHorNorm)
        })()
    }, [emailAluno])


    useEffect(() => {
        (async () => {
            //consulta dos professores
            const professores = collection(db, 'Professores');
            const professoresSnapshot = await getDocs(professores);
            const nomesProfessores = professoresSnapshot.docs.map(doc => doc.data().nome);
            setNomesProf(nomesProfessores)
        })()
    }, [])


    return (
        <div className='cadastroContainer'>
            <h2 className={'texto'}>Reagendar horário aluno:</h2>
            <select
                className='select'
                value={diaHorSelecAtual}
                onChange={handleSelectDiaHorAula}>
                <option value="">Selecione o dia para reagendar</option>
                {listaDiaHorAluno.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            {
                diaHorSelecAtual !== '' ?
                    <div>
                        <select
                            className='select'
                            value={profSelec}
                            onChange={handleSelectProf}>
                            <option value="">Escolha um professor</option>
                            {nomesProf.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div> : null
            }
            {
                profSelec !== '' ?
                    <div>
                        <div>
                            <h2 className='texto'>Para qual data?</h2>
                            <Calendar
                                onChange={onChangeDataCalendario}
                                value={dataCalendarioRemarc}
                                formatShortWeekday={diasFormatados}
                                minDate={new Date()}
                                maxDate={maxData}
                                calendarType="gregory"
                                tileDisabled={tileDisabled}
                            /* className={"custom-calendar"} */
                            />
                        </div>
                        <select
                            className='select'
                            value={horDispSelec}
                            onChange={handleHorSelect}>
                            <option value="">Escolha um horário disponível:</option>
                            {listaHorDisp.map((item, index) => (
                                <option key={index} value={item}>
                                    {item.substring(3, 5) + 'h'}
                                </option>
                            ))}
                        </select>
                        <div>
                            {
                                horDispSelec !== '' ?
                                    <button className='btnCadastrar' onClick={handleReagendar}>Reagendar</button> : null
                            }
                        </div>
                    </div> : null
            }
        </div>
    )
}

export default ReagendarAluno;

