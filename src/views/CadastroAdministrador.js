import { useState } from 'react';
import { db } from '../firebase'
import { setDoc, doc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


const CadastroAdministrador = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');


  // inclusão no DB de professor
  const handleCadastroProf = async () => {
    if (nome !== '' && email !== '' && telefone !== '') {
      await setDoc(doc(db, 'Administradores', email), {
        nome: nome,
        email: email,
        telefone: telefone,
        perfil: 'administrador'
      }).then([
        window.alert('Administrador cadastrado com sucesso!'),
        setNome(''), setEmail(''),
        setTelefone('')
      ])

      //gerador de senha aleatória
      function gerarSenha(tamanho) {
        var caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var senha = "";
        for (var i = 0; i < tamanho; i++) {
          var indiceCaractere = Math.floor(Math.random() * caracteres.length);
          senha += caracteres[indiceCaractere];
        }
        return senha;
      }

      let novaSenha = gerarSenha(6);

      //criar novo usuário com senha aleatória
      const auth = getAuth();
      console.log('email', email);
      createUserWithEmailAndPassword(auth, email, novaSenha)
        .then((userCredential) => {
          console.log('UserAdmin criado')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('erro', errorCode, errorMessage);
        });


      //envio de email para redefinição de senha
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log('email de redefinição de senha foi enviado');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('erro', errorCode, errorMessage);
        });

    } else {
      window.alert('Preencha todos os campos obrigatórios!')
    }
    window.location.reload()
  }

  return (
    <div className={'cadastroContainer'}>
      <h2 className={'texto'}>Cadastro de Administrador</h2>
      <div className={'formGroup'}>
        <input
          className={'input'}
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className={'formGroup'}>
        <input
          className={'input'}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={'formGroup'}>
        <input
          className={'input'}
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <button className={'btnCadastrar'} onClick={handleCadastroProf}>Cadastrar Administrador</button>
    </div>
  )
}

export default CadastroAdministrador;
