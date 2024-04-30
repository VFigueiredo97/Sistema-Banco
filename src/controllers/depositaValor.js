const dados = require("../bancodedados")
const { achaConta, achaNumero, achaValor } = require("../services/servicos")

const depositaValor = (req, res) => {
    const { valor, numero_conta } = req.body
    let localizaNumero = achaNumero(numero_conta);
    let contaEncontrada = achaConta(numero_conta);
    let valorEncontrado = achaValor(valor)

    if (contaEncontrada !== undefined) {
        return res.status(400).json({ mensagem: contaEncontrada })

    }

    if (valorEncontrado !== undefined) {
        return res.status(400).json({ mensagem: valorEncontrado })
    }

    if (valor > 0) {
        dados.depositos.push({
            data: new Date(),
            numero_conta,
            valor
        })
        dados.contas[localizaNumero].saldo = dados.contas[localizaNumero].saldo + valor
        return res.status(200).send()

    } else {
        return res.status(404).json({ mensagem: `É preciso informar um valor acima de 0` })

    }

}


module.exports = {
    depositaValor
}