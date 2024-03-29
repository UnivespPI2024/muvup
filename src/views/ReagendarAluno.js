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
            const q = query(collection(db, 'Alunos'), where('email', '==', 'aluno10@gmail.com'))
            const diaHorAlunoSnapshot = await getDocs(q)
            const listahorarios = diaHorAlunoSnapshot.docs.map(doc => doc.data().diaHorAula);
            const listaNormalizada = listahorarios[0]
            // const listaValores = Object.values(listaNormalizada)
            // console.log('listaDiaHorAluno', listaNormalizada);

            const keysConcatenadas = [['diaAula1', 'horaAula1'], ['diaAula2', 'horaAula2'], ['diaAula3', 'horaAula3']]; // Pares de chaves que você quer concatenar
            const listaValoresConcat = keysConcatenadas.map(([key1, key2]) => {
                if (listaNormalizada.hasOwnProperty(key1) && listaNormalizada.hasOwnProperty(key2)) {
                    return listaNormalizada[key1] + listaNormalizada[key2];
                }
                return ''; 
            });
            console.log('listaValoresConcat', listaValoresConcat);
            setListaDiaHorAluno(listaValoresConcat)
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

