import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import '../estilos/login.css'


import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";


function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  //verifica se o usuário já está logado
  useEffect(() => {
    console.log('entrouAAqui');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLogado(true)
        console.log('logado');
      }else{
        setLogado(false)
      }
    });
    if(logado){
      navigate('/app')
      console.log('logado');
    }else{
      navigate('/')
    }
  }, [logado])

  // redefinição de senha através de link no email
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

  //faz a entrada através de login e senha
  const autenticacaoUsuario = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('user', user);
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
        <a href="#" onClick={enviarEmailRedefSenha} className="forgot-password">Esqueci minha senha</a>
      </div>
    </div>
  );
}

export default Login;
