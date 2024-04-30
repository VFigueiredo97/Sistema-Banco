const dados = require("../bancodedados")
const { achaConta } = require("../services/servicos")


const validaConta = (req, res, next) => {
    const numero_conta = req.params.numeroConta

    // Valida Conta
    let contaEncontrada = achaConta(numero_conta)

    if (contaEncontrada !== undefined) {
        return res.status(404).json({ mensagem: contaEncontrada })

    }
    return next()
}


const validaNovaConta = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: `Precisamos que sejam informados todos os dados` })
    };

    for (i = 0; i < dados.contas.length; i++) {
        if (cpf === dados.contas[i].usuario.cpf) {
            return res.status(400).json({ mensagem: 'o CPF já possui conta ativa' })
        }

        if (email === dados.contas[i].usuario.email) {
            return res.status(400).json({ mensagem: 'o email já possui conta ativa' })
        }
    }
    return next()
};


const validaAtualizaConta = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const numero_conta = req.params.numeroConta
    let contaEncontrada = achaConta(numero_conta)

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha || !numero_conta) {
        return res.status(404).json({ mensagem: `Precisamos que sejam informados todos os dados` })
    };

    if (contaEncontrada !== undefined) {
        return res.status(404).json({ mensagem: contaEncontrada })

    }

    for (i = 0; i < dados.contas.length; i++) {
        if (cpf === dados.contas[i].usuario.cpf) {
            return res.status(400).json({ mensagem: 'o CPF já possui conta ativa' })
        }

        if (email === dados.contas[i].usuario.email) {
            return res.status(400).json({ mensagem: 'o email já possui conta ativa' })
        }
    }

    return next()


};

module.exports = { validaConta, validaNovaConta, validaAtualizaConta }
