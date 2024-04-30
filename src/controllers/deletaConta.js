const dados = require("../bancodedados")
const { achaConta, achaNumero } = require("../services/servicos")


const deletaConta = (req, res) => {
    const numero_conta = req.params.numeroConta
    let localizaNumero = achaNumero(numero_conta);
    let contaEncontrada = achaConta(numero_conta)

    if (contaEncontrada !== undefined) {
        return res.status(404).json({ mensagem: contaEncontrada })

    }

    if (Number(dados.contas[localizaNumero].saldo) === 0) {
        dados.contas.splice(localizaNumero, 1)
        return res.status(200).send(dados.contas)
    } else {
        return res.status(401).json({ mensagem: `A conta só pode ser removida se o saldo for zero!` })
    }

}

module.exports = {
    deletaConta
}