import React, {useState} from "react";


const SelHorAulaAluno = ({onChangeDia, onChangeHora}) =>{
  const [diaSemana, setDiaSemana] = useState('');
  const [horaAula, setHoraAula] = useState('');

  const handleSelectDia = (event) => {
    setDiaSemana(event.target.value)
    onChangeDia(event.target.value)
  };

  const handleSelectHorAula = (event) => {
    setHoraAula(event.target.value);
    onChangeHora(event.target.value)
  };

    return(
        <div>
            <select
                style={styles.select}
                value={diaSemana}
                onChange={handleSelectDia}>
                <option value="">Selecione o dia da semana</option>
                <option value="segunda">Segunda</option>
                <option value="terça">Terça</option>
                <option value="quarta">Quarta</option>
                <option value="quinta">Quinta</option>
                <option value="sexta">Sexta</option>
            </select>
            <select
                style={styles.select}
                value={horaAula}
                onChange={handleSelectHorAula}>
                <option value="">Selecione o horário da aula</option>
                <option value="6">06:00h até 07:00h</option>
                <option value="7">07:00h até 08:00h</option>
                <option value="8">08:00h até 09:00h</option>
                <option value="9">09:00h até 10:00h</option>
                <option value="10">10:00h até 11:00h</option>
                <option value="11">11:00h até 12:00h</option>
                <option value="12">12:00h até 13:00h</option>
                <option value="13">13:00h até 14:00h</option>
                <option value="14">14:00h até 15:00h</option>
                <option value="15">15:00h até 16:00h</option>
                <option value="16">16:00h até 17:00h</option>
                <option value="17">17:00h até 18:00h</option>
            </select>
        </div>
    )
}

const styles = {
    select: {
      margin: '15px'
    }
  }

export default SelHorAulaAluno;