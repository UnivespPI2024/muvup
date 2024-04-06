import React from 'react';
import logo from '../images/logo.png'
import '../estilos/login.css'

function Login() {
    return (
      <div className="App">
        <div className="container">
          <img src={logo} alt="Logo" className="logo" /> 
          <h1>Login</h1>
          <form>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" value="Entrar" />
          </form>
          <a href="#" className="forgot-password">Esqueci minha senha</a>
        </div>
      </div>
    );
  }

export default Login;
