import React, {useState} from "react";

import styleViews from '../estilos/styleViews'

const SelHorAulaAluno = ({onChangeDia, onChangeHora, diaAulaSelec, horaAulaSelec}) =>{
  const [diaAula, setDiaAula] = useState(diaAulaSelec);
  const [horaAula, setHoraAula] = useState(horaAulaSelec);

  const handleSelectDia = (event) => {
    setDiaAula(event.target.value)
    onChangeDia(event.target.value)
  };

  const handleSelectHorAula = (event) => {
    setHoraAula(event.target.value);
    onChangeHora(event.target.value)
  };

    return(
        <div>
            <select
                style={styleViews.select}
                value={diaAula}
                onChange={handleSelectDia}>
                <option value="">Selecione o dia da semana</option>
                <option value="segunda">Segunda</option>
                <option value="terça">Terça</option>
                <option value="quarta">Quarta</option>
                <option value="quinta">Quinta</option>
                <option value="sexta">Sexta</option>
            </select>
            <select
                style={styleViews.select}
                value={horaAula}
                onChange={handleSelectHorAula}>
                <option value="">Selecione o horário da aula</option>
                <option value="hor06">06:00h até 07:00h</option>
                <option value="hor07">07:00h até 08:00h</option>
                <option value="hor07">08:00h até 09:00h</option>
                <option value="hor09">09:00h até 10:00h</option>
                <option value="hor10">10:00h até 11:00h</option>
                <option value="hor11">11:00h até 12:00h</option>
                <option value="hor12">12:00h até 13:00h</option>
                <option value="hor13">13:00h até 14:00h</option>
                <option value="hor14">14:00h até 15:00h</option>
                <option value="hor15">15:00h até 16:00h</option>
                <option value="hor16">16:00h até 17:00h</option>
                <option value="hor17">17:00h até 18:00h</option>
            </select>
        </div>
    )
}

export default SelHorAulaAluno;