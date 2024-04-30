const dados = require("../bancodedados")
const { achaConta, achaNumero } = require("../services/servicos")

const validaSenhaQuery = (req, res, next) => {
    const { senha_banco } = req.query

    if (!senha_banco) {
        return res.status(400).json({ mensagem: `Precisamos que seja informada uma senha` })
    };

    if (String(senha_banco) !== String(dados.banco.senha)) {
        return res.status(401).json({ mensagem: 'Login ou Senha incorretos' })
    };

    return next()

};

const validaSenhaBody = (req, res, next) => {
    const { senha, numero_conta } = req.body
    let localizaNumero = achaNumero(numero_conta);
    let contaEncontrada = achaConta(numero_conta)

    if (contaEncontrada !== undefined) {
        return res.status(404).json({ mensagem: contaEncontrada })

    }

    if (!senha) {
        return res.status(400).json({ mensagem: `Precisamos que seja informada uma senha` })
    };

    if (String(senha) !== String(dados.contas[localizaNumero].usuario.senha)) {
        return res.status(401).json({ mensagem: 'Login ou Senha incorretos' })
    };

    return next()
}



module.exports = {
    validaSenhaBody,
    validaSenhaQuery
}
