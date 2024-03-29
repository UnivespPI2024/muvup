import React, { useState, useEffect } from 'react';

import styleViews from '../estilos/styleViews'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { db } from '../firebase'
import { collection, getDocs, query, where } from 'firebase/firestore/lite';

const ReagendarAluno = () => {

    const [date, setDate] = useState(new Date())
    const [listaDiaHorAluno, setListaDiaHorAluno] = useState([])
    const [diaHorSelec, setDiaHorSelec] = useState('')

    const onChangeData = date => {
        setDate(date);
    }

    const handleSelectDiaHorAula = (event) => {
        setDiaHorSelec(event.target.value)
    }

    const diasFormatados = (locale, date) => {
        const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        return weekdays[date.getDay()];
    };

    useEffect(() => {
        (async () => {
            function datasPorDiaSemana(diaDaSemanaStr, hora) {

                const diasDaSemana = {
                    "domingo": 0, "segunda": 1, "terca": 2, "quarta": 3,
                    "quinta": 4, "sexta": 5, "sabado": 6
                };

                const diaDaSemana = diasDaSemana[diaDaSemanaStr];
                const datas = [];
                const hoje = new Date();
                const diaAlvo = diaDaSemana; 

                for (let i = 0; i < 30; i++) {
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

            const q = query(collection(db, 'Alunos'), where('email', '==', 'aluno12@gmail.com'))
            const diaHorAlunoSnapshot = await getDocs(q)
            const listahorarios = diaHorAlunoSnapshot.docs.map(doc => doc.data().diaHorAula);
            const listaNormalizada = listahorarios[0]

            const keysConcatenadas = [['diaAula1', 'horaAula1'], ['diaAula2', 'horaAula2'], ['diaAula3', 'horaAula3']]; // Pares de chaves que você quer concatenar
            const listaDiaHor = keysConcatenadas.map(([key1, key2]) => {
                if (listaNormalizada.hasOwnProperty(key1) && listaNormalizada.hasOwnProperty(key2)) {
                    return listaNormalizada[key1] + ' ' + listaNormalizada[key2].substring(3, 5);
                }
                return '';
            });
            console.log('listaValoresConcat', listaDiaHor);
            
            const listaDataDiaHor = listaDiaHor.map((diaHor)=>{
                const partes = diaHor.split(' ');
                const dia = partes[0]
                const hora = partes[1]
                return datasPorDiaSemana(dia, hora)
            })
            
            const listaDataDiaHorNorm = [].concat(...listaDataDiaHor)
            setListaDiaHorAluno(listaDataDiaHorNorm)

            console.log('nextDays', listaDataDiaHorNorm);
        })()
    }, [])


    return (
        <div style={styleViews.cadastroContainer}>
            <h2 style={styleViews.texto}>Reagendar horário aluno:</h2>
            <select
                style={styleViews.select}
                value={diaHorSelec}
                onChange={handleSelectDiaHorAula}>
                <option value="">Selecione o dia e horário da aula</option>
                {listaDiaHorAluno.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <div>
                <Calendar
                    onChange={onChangeData}
                    value={date}
                    formatShortWeekday={diasFormatados}
                    minDate={new Date(2024, 1, 1)}
                />
            </div>
        </div>
    )
}

export default ReagendarAluno;

