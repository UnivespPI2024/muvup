import React from 'react';
import '../estilos/menulateral.css' 

const MenuLateral = ({onItemClick}) => {
  
  const handleClick = (component) => {
    onItemClick(component);
  };

  return (
    <div className="menulateral">
      <ul className="menu-nav">
        <li className="menu-group">Cadastrar</li>
        <li className="menu-item" onClick={() => handleClick('cadastroAluno')}>
          <span className="menu-link">Cadastrar Alunos</span>
        </li>
        <li className="menu-item" onClick={() => handleClick('cadastroProfessor')}>
          <span className="menu-link">Cadastrar Professores</span>
        </li>
        <li className="menu-item" onClick={() => handleClick('cadastroAdministrador')}>
          <span className="menu-link">Cadastrar Administradores</span>
        </li>
        <li className="menu-group">Procurar</li>
        <li className="menu-item" onClick={() => handleClick('todosAlunos')}>
          <span className="menu-link">Listar Todos Alunos</span>
        </li>
        <li className="menu-item" onClick={() => handleClick('todosProfessores')}>
          <span className="menu-link">Listar Todos Professores</span>
        </li>
        <li className="menu-item" onClick={() => handleClick('procurarAluno')}>
          <span className="menu-link">Procurar Aluno</span>
        </li>
        <li className="menu-group">Reagendar Aula</li>
        <li className="menu-item" onClick={() => handleClick('reagendarAluno')}>
          <span className="menu-link">Reagendar Aula Aluno</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuLateral;
