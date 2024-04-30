const dados = require("../bancodedados")

const criaConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    let numeral = Number(dados.contas[dados.contas.length - 1].numero)
    dados.contas.push({
        numero: String(numeral + 1),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    })
    return res.status(201).send()
}


module.exports = {
    criaConta
}