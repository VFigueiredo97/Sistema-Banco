const dados = require("../bancodedados")
const { achaConta, achaNumero, achaValor } = require("../services/servicos")

const sacaValor = (req, res) => {
    const { valor, numero_conta } = req.body
    let localizaNumero = achaNumero(numero_conta);
    let contaEncontrada = achaConta(numero_conta);
    let valorEncontrado = achaValor(valor)

    if (contaEncontrada !== undefined) {
        return res.status(404).json({ mensagem: contaEncontrada })
    }

    if (valorEncontrado !== undefined) {
        return res.status(400).json({ mensagem: valorEncontrado })
    }

    if ((dados.contas[localizaNumero].saldo - valor) >= 0) {
        dados.saques.push({
            data: new Date(),
            numero_conta,
            valor
        })
        dados.contas[localizaNumero].saldo = dados.contas[localizaNumero].saldo - valor
        return res.status(200).send()

    } else {
        return res.status(400).json({ mensagem: `A conta não possui saldo suficiente para sacar a quantia de R$ ${valor}` })

    }
}


module.exports = {
    sacaValor
}