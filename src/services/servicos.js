const dados = require("../bancodedados")


// Funções Auxiliares

const achaNumero = (numero_conta) => {
    let localizaNumero = dados.contas.indexOf(dados.contas.find((conta) => conta.numero === numero_conta));
    return localizaNumero
}

const achaConta = (numero_conta) => {
    if (!numero_conta) {
        return `É preciso informar um numero de conta válido`
    }

    let localizaNumero = dados.contas.indexOf(dados.contas.find((conta) => conta.numero === numero_conta));

    if (localizaNumero <= -1) {
        return `Esse numero de conta não existe, preencha com um numero existente`
    }

}

const achaValor = (valor) => {
    if (!valor) {
        return `É preciso informar um valor`
    }

    if (valor < 0) {
        return `É preciso informar um valor maior que 0`
    }

    if (!Number(valor)) {
        return `É preciso informar um numero como valor`
    }
}


module.exports = {
    achaConta,
    achaNumero,
    achaValor
}