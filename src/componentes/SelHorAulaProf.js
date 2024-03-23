import React, { useState } from 'react';

import styleSelHorAulaProf from '../estilos/styleSelHorProf';

function SelHorAulaProf({ onChangeHor, handleConf }) {

  const [botaoClicado, setBotaoClicado] = useState(false);

  const [checkboxes, setCheckboxes] = useState({
    hor06: false, hor07: false, hor08: false,
    hor09: false, hor10: false, hor11: false,
    hor12: false, hor13: false, hor14: false,
    hor15: false, hor16: false, hor17: false,
  });

  const handleBotaoClicado = () => {
    handleConf(true)
    setBotaoClicado(true);
  };

  const handleCheckboxChange = (event) => {
    handleConf(false)
    setBotaoClicado(false);
    const { name, checked } = event.target;
    setCheckboxes({
      ...checkboxes,
      [name]: checked
    });
  };

  const enviar = (event) => {
    event.preventDefault();
    const horSelec = Object.keys(checkboxes).filter(option => checkboxes[option]);
    onChangeHor(horSelec)
  };

  return (
    <form onSubmit={enviar}>
      <div>
        <input
          type="checkbox"
          id="hor06"
          name="hor06"
          checked={checkboxes.hor06}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor06 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="06:00h até 07:00h">06:00h até 07:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor07"
          name="hor07"
          checked={checkboxes.hor07}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor07 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="07:00h até 08:00h">07:00h até 08:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor08"
          name="hor08"
          checked={checkboxes.hor08}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor08 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="08:00h até 09:00h">08:00h até 09:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor09"
          name="hor09"
          checked={checkboxes.hor09}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor09 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="09:00h até 10:00h">09:00h até 10:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor10"
          name="hor10"
          checked={checkboxes.hor10}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor10 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="10:00h até 11:00h">10:00h até 11:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor11"
          name="hor11"
          checked={checkboxes.hor11}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor11 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="11:00h até 12:00h">11:00h até 12:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor12"
          name="hor12"
          checked={checkboxes.hor12}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor12 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="12:00h até 13:00h">12:00h até 13:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor13"
          name="hor13"
          checked={checkboxes.hor13}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor13 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="13:00h até 14:00h">13:00h até 14:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor14"
          name="hor14"
          checked={checkboxes.hor14}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor14 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="14:00h até 15:00h">14:00h até 15:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor15"
          name="hor15"
          checked={checkboxes.hor15}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor15 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="15:00h até 16:00h">15:00h até 16:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor16"
          name="hor16"
          checked={checkboxes.hor16}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor16 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="16:00h até 17:00h">16:00h até 17:00h</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="hor17"
          name="hor17"
          checked={checkboxes.hor17}
          onChange={handleCheckboxChange}
          style={{ appearance: 'none', width: '15px', height: '15px', backgroundColor: checkboxes.hor17 ? '#6ABC8B' : '#fff', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }}
        />
        <label style={styleSelHorAulaProf.checkBoxLabel} htmlFor="17:00h até 18:00h">17:00h até 18:00h</label>
      </div>
      <button
        type="submit"
        onClick={handleBotaoClicado}
        style={botaoClicado ? styleSelHorAulaProf.btnCadastrarSelec : styleSelHorAulaProf.btnCadastrar}
      >Confirmar</button>
    </form>
  );
}

export default SelHorAulaProf;
