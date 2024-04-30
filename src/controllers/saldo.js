const dados = require("../bancodedados")
const { achaConta, achaNumero } = require("../services/servicos")

const saldo = (req, res) => {
    const { senha, numero_conta } = req.query
    let localizaNumero = achaNumero(numero_conta);
    let contaEncontrada = achaConta(numero_conta);

    if (contaEncontrada !== undefined) {
        return res.status(404).json({ mensagem: contaEncontrada })

    }

    if (!senha) {
        return res.status(404).json({ mensagem: `Precisamos que seja informada uma senha` })
    };

    if (Number(senha) !== dados.contas[localizaNumero].usuario.senha) {
        return res.status(401).json({ mensagem: 'Login ou Senha incorretos' })
    };

    return res.status(200).json({ saldo: dados.contas[localizaNumero].saldo });

}


module.exports = {
    saldo
}