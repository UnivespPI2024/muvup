export const gerarSenha = (tamanho) => {
    //gerador de senha aleatória
    let caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let senha = "";
    for (let i = 0; i < tamanho; i++) {
        let indiceCaractere = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indiceCaractere];
    }
    return senha;
}




