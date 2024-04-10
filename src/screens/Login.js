import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import '../estilos/login.css'

import { db } from '../firebase'
import { setDoc, doc, collection, getDocs, query, where, updateDoc, arrayUnion } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";

function Login() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  const [perfil, setPerfil] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() =>{
    (async () => {
      console.log('email',email);
      const qAlunos = query(collection(db, 'Alunos'), where('email', '==', email))
      const qSnapDocAlunos = await getDocs(qAlunos)
      if(!qSnapDocAlunos.empty){
        qSnapDocAlunos.forEach(doc => {
          setPerfil(doc.data().perfil)
        })
      }
      const qProf = query(collection(db, 'Professores'), where('email', '==', email))
      const qSnapDocProf= await getDocs(qProf)
      if(!qSnapDocProf.empty){
        qSnapDocProf.forEach(doc => {
          setPerfil(doc.data().perfil)
        })
      }
    })()

  }, [email])

  //verifica se o usuário já está logado
  useEffect(() => {
    console.log('entrouAAqui');
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogado(true)
      } else {
        setLogado(false)
      }
    });
    if (logado) {
      perfil == 'aluno' ? navigate('/aluno') : null
      perfil == 'professor' ? navigate('/professor') : null
      perfil == 'administrador' ? navigate('/admin') : null
    } else {
      navigate('/')
    }
  }, [logado, perfil])

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
        // console.log('user', user);
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
