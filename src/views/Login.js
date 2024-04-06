import React, {useState} from 'react';
import logo from '../images/logo.png'
import '../estilos/login.css'

import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const auth = getAuth();

  const enviarEmailRedefSenha = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email de redefinição de senha foi enviado');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('erro', errorCode, errorMessage);
      });
  }

  const autenticacaoUsuario = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user',user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('erro', errorCode, errorMessage);
      });
  }



  return (
    <div className="Login">
      <div className="container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Login</h1>
        <form onSubmit={autenticacaoUsuario}>
          <input type="text" name="username" placeholder="Username" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="password" placeholder="Password" onChange={(e) => setSenha(e.target.value)} />
          <input type="submit" value="Entrar" />
        </form>
        <a  href="#" onClick={enviarEmailRedefSenha} className="forgot-password">Esqueci minha senha</a>
      </div>
    </div>
  );
}

export default Login;
