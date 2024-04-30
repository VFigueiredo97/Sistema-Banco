const dados = require("../bancodedados")

const listaContas = (req, res) => {
    res.status(200).send(dados.contas)

}

module.exports = { listaContas }


