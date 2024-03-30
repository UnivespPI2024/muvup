import React, { useState, useEffect } from 'react';

import styleViews from '../estilos/styleViews'
import Calendar from 'react-calendar';
import { MAX_DIAS_REMARC, MAX_ALUNOS } from './constantes';

import 'react-calendar/dist/Calendar.css';
import '../estilos/customCalendar.css';

import { db } from '../firebase'
import { collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore/lite';

const ReagendarAluno = () => {

    const diasDaSemana = {
        "domingo": 0, "segunda": 1, "terça": 2, "quarta": 3,
        "quinta": 4, "sexta": 5, "sabado": 6
    };

    const diasDaSemana2 = {
        0: 'domingo', 1: 'segunda', 2: 'terça', 3: 'quarta',
        4: 'quinta', 5: 'sexta', 6: 'sabado',
    };

    const [dataCalendario, setDataCalendario] = useState(new Date())
    const [listaDiaHorAluno, setListaDiaHorAluno] = useState([])
    const [diaHorSelec, setDiaHorSelec] = useState('')
    const [horDisp, setHorDisp] = useState([])
    const [horDispSelec, setHorDispSelec] = useState('')
    const [nomesProf, setNomesProf] = useState([])
    const [profSelec, setprofSelec] = useState('')
    const [emailProf, setEmailProf] = useState('');

    const handleReagendar = () => {
        setDoc(doc(db, 'Professores', emailProf, 'Reagendamentos', 'março'), {
            email:'aluno2@gmail.com'
        })
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
        setDiaHorSelec(event.target.value)
        setprofSelec('')
        setDataCalendario('')
        setHorDispSelec('')
    }

    const handleSelectProf = async (event) => {
        setprofSelec(event.target.value);
        setDataCalendario('')
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
        setDataCalendario(data);
        const dia = diasDaSemana2[data.getDay()];

        const qHorarios = query(collection(db, 'Professores', emailProf, dia));
        const querySnapshot = await getDocs(qHorarios).catch((error) => { console.log('erro', error); })
        //horarios disponíveis por professor => limite de alunos por aula = MAX_ALUNOS
        const horariosDisp = querySnapshot.docs.map(doc => {
            if (Object.keys(doc.data().alunos).length < MAX_ALUNOS) {
                return doc.id
            }
        }).filter(value => value !== undefined);
        setHorDisp(horariosDisp)
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
                console.log('datas', datas);
                return datas;
            }

            //consulta no BD dos dias e horários de um aluno
            const q = query(collection(db, 'Alunos'), where('email', '==', 'aluno2@gmail.com'))
            const diaHorAlunoSnapshot = await getDocs(q)
            const listahorarios = diaHorAlunoSnapshot.docs.map(doc => doc.data().diaHorAula);
            const listaNormalizada = listahorarios[0]

            // junção de keys no mesmo array ex. diaAula1 && horaAula1
            const keysConcatenadas = [['diaAula1', 'horaAula1'], ['diaAula2', 'horaAula2'], ['diaAula3', 'horaAula3']]; // Pares de chaves que você quer concatenar
            const listaDiaHor = keysConcatenadas.map(([key1, key2]) => {
                if (listaNormalizada.hasOwnProperty(key1) && listaNormalizada.hasOwnProperty(key2)) {
                    return listaNormalizada[key1] + ' ' + listaNormalizada[key2].substring(3, 5);
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
    }, [])


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
        <div style={styleViews.cadastroContainer}>
            <h2 style={styleViews.texto}>Reagendar horário aluno:</h2>
            <select
                style={styleViews.select}
                value={diaHorSelec}
                onChange={handleSelectDiaHorAula}>
                <option value="">Selecione o dia para reagendar</option>
                {listaDiaHorAluno.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <div>
                <select
                    style={styleViews.select}
                    value={profSelec}
                    onChange={handleSelectProf}>
                    <option value="">Escolha um professor</option>
                    {nomesProf.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            {
                profSelec !== '' ?
                    <div>
                        <div>
                            <h2 style={styleViews.texto}>Para qual data?</h2>
                            <Calendar
                                onChange={onChangeDataCalendario}
                                value={dataCalendario}
                                formatShortWeekday={diasFormatados}
                                minDate={new Date()}
                                maxDate={maxData}
                                calendarType="gregory"
                                tileDisabled={tileDisabled}
                            /* className={"custom-calendar"} */
                            />
                        </div>
                        <select
                            style={styleViews.select}
                            value={horDispSelec}
                            onChange={handleHorSelect}>
                            <option value="">Escolha um horário disponível:</option>
                            {horDisp.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <button style={styleViews.btnCadastrar} onClick={handleReagendar}>Reagendar</button>
                    </div> : null
            }
        </div>
    )
}

export default ReagendarAluno;

