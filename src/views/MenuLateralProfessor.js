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
        <li className="menu-group">Relatórios Alunos</li>
        <li className="menu-item" onClick={() => handleClick('relatorioSaude')}>
          <span className="menu-link">Relatório de Saúde</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuLateralProfessor;
