import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import { gerarSenha } from '../utils/gerarSenha'

const auth = getAuth();
export const criarUsuario = async (email) => {
    try {
        //gerar senha
        let novaSenha = gerarSenha(6);
        console.log('novaSenha',novaSenha);

        //criar novo usuário com email e senha
        const userCredencial = await createUserWithEmailAndPassword(auth, email, '12345678')
        const user = userCredencial.user;

        //enviar email de redefinição de senha
        sendPasswordResetEmail(auth, email).then(console.log('email de redefinição de senha enviado'))
        
        return user
    } catch (error) {
        throw error;
    }
}




