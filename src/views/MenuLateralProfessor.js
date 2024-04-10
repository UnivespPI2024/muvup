import React from 'react';
import '../estilos/menulateral.css' 

const MenuLateralProfessor = ({onItemClick}) => {
  
  const handleClick = (component) => {
    onItemClick(component);
  };

  return (
    <div className="menulateral">
      <ul className="menu-nav">
        <li className="menu-group">Listar Aulas</li>
        <li className="menu-item" onClick={() => handleClick('listarAulasProfessor')}>
          <span className="menu-link">Listar Aulas Professor</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuLateralProfessor;
