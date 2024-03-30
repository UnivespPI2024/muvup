import React, { useState } from "react";

import styleViews from '../estilos/styleViews'

const SelHorAulaAluno = ({ onChangeDia, onChangeHora, diaAulaSelec, horaAulaSelec, horDispProf }) => {
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

  return (
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
        {horDispProf.map((item, index) => (
          <option key={index} value={item}>
            {item.substring(3,5)+'h'}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelHorAulaAluno;