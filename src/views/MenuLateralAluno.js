import React from 'react';
import '../estilos/menulateral.css' 

const MenuLateralAluno = ({onItemClick}) => {
  
  const handleClick = (component) => {
    onItemClick(component);
  };

  return (
    <div className="menulateral">
      <ul className="menu-nav">
        <li className="menu-group">Reagendar Aula</li>
        <li className="menu-item" onClick={() => handleClick('reagendarAluno')}>
          <span className="menu-link">Reagendar Aula Aluno</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuLateralAluno;
