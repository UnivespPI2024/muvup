import { db } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import { collection, getDocs, query } from 'firebase/firestore/lite';

const auth = getAuth();
export const criarUsuario = async (email) => {
    try{
        const userCredencial = await createUserWithEmailAndPassword(auth, email, '12345678')
        const user = userCredencial.user;
        return user
    }catch(error){
        throw error;
    }
    }

//gerador de senha aleatória
/* function gerarSenha(tamanho) {
    var caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var senha = "";
    for (var i = 0; i < tamanho; i++) {
        var indiceCaractere = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indiceCaractere];
    }
    return senha;
}

let novaSenha = gerarSenha(6);

//envio de email para redefinição de senha
sendPasswordResetEmail(auth, email)
.then(() => {
  console.log('email de redefinição de senha foi enviado');
})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log('erro', errorCode, errorMessage);
}); */


