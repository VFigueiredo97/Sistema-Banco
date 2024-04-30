const dados = require("../bancodedados")

const transferencia = (req, res) => {
    const { senha, numero_conta_origem, numero_conta_destino, valor } = req.body
    let valorEncontrado = achaValor(valor)
    if (valorEncontrado !== undefined) {
        return res.status(400).json({ mensagem: valorEncontrado })
    }

    // Validação Contas 
    if (!numero_conta_origem) {
        return res.status(404).json({ mensagem: `É preciso informar um numero de conta Origem válida` })
    }

    if (!numero_conta_destino) {
        return res.status(404).json({ mensagem: `É preciso informar um numero de conta Destino válida` })
    }

    //Localizar Numero Contas
    let localizaNumeroOrigem = dados.contas.indexOf(dados.contas.find((conta) => conta.numero === numero_conta_origem));
    let localizaNumeroDestino = dados.contas.indexOf(dados.contas.find((conta) => conta.numero === numero_conta_destino));


    if (localizaNumeroOrigem <= -1) {
        return res.status(404).json({ mensagem: `Esse numero de conta Origem não existe, preencha com um numero existente` })
    }

    if (localizaNumeroDestino <= -1) {
        return res.status(404).json({ mensagem: `Esse numero de conta Destino não existe, preencha com um numero existente` })
    }

    // Validação Senha

    if (!senha) {
        return res.status(404).json({ mensagem: `Precisamos que seja informada uma senha` })
    };


    if (Number(senha) !== dados.contas[localizaNumeroOrigem].usuario.senha) {
        return res.status(401).json({ mensagem: 'Login ou Senha incorretos' })
    };

    // Valida Saldo + Executar transferência
    if ((dados.contas[localizaNumeroOrigem].saldo - valor) >= 0) {
        dados.contas[localizaNumeroOrigem].saldo = dados.contas[localizaNumeroOrigem].saldo - valor
        dados.contas[localizaNumeroDestino].saldo = dados.contas[localizaNumeroDestino].saldo + valor
        dados.transferencias.push({
            numero_conta_origem,
            numero_conta_destino,
            valor,
            senha,
        });


        return res.status(200).send()

    } else {
        return res.status(404).json({ mensagem: `A conta não possui saldo suficiente para transferir a quantia de R$ ${valor}` })

    }

}

module.exports = {
    transferencia
}
