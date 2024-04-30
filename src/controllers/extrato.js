const dados = require("../bancodedados")
const { achaConta, achaNumero } = require("../services/servicos")


const extrato = (req, res) => {
    const { senha, numero_conta } = req.query
    let extrato = {
        saques: [],
        depositos: [],
        transferenciasRecebidas: [],
        transferenciasEnviadas: []
    }
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

    for (let i = 0; i < dados.saques.length; i++) {
        if (Number(dados.saques[i].numero_conta) === Number(numero_conta)) {
            extrato.saques.push(dados.saques[i])
        }
    }

    for (let i = 0; i < dados.depositos.length; i++) {
        if (Number(dados.depositos[i].numero_conta) === Number(numero_conta)) {
            extrato.depositos.push(dados.depositos[i])
        }
    }

    for (let i = 0; i < dados.transferencias.length; i++) {
        if (Number(dados.transferencias[i].numero_conta_origem) === Number(numero_conta)) {
            extrato.transferenciasEnviadas.push({
                numero_conta_origem: dados.transferencias[i].numero_conta_origem,
                numero_conta_destino: dados.transferencias[i].numero_conta_destino,
                valor: dados.transferencias[i].valor
            }
            )
        }
    }

    for (let i = 0; i < dados.transferencias.length; i++) {
        if (Number(dados.transferencias[i].numero_conta_destino) === Number(numero_conta)) {
            extrato.transferenciasRecebidas.push({
                numero_conta_origem: dados.transferencias[i].numero_conta_origem,
                numero_conta_destino: dados.transferencias[i].numero_conta_destino,
                valor: dados.transferencias[i].valor
            })
        }
    }

    return res.send(extrato)

}


module.exports = {
    extrato
}