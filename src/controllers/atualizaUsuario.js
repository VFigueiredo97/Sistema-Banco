const dados = require("../bancodedados")
const { achaNumero } = require("../services/servicos")


const atualizaUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const numero_conta = req.params.numeroConta
    let localizaNumero = achaNumero(numero_conta);
    dados.contas[localizaNumero].usuario.nome = nome
    dados.contas[localizaNumero].usuario.cpf = cpf
    dados.contas[localizaNumero].usuario.data_nascimento = data_nascimento
    dados.contas[localizaNumero].usuario.email = email
    dados.contas[localizaNumero].usuario.telefone = telefone
    dados.contas[localizaNumero].usuario.senha = senha
    return res.status(200).send()

}

module.exports = {
    atualizaUsuario
}