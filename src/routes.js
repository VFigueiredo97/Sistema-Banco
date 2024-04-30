const express = require("express")
const { listaContas } = require("./controllers/listaContas")
const { criaConta } = require("./controllers/criaConta")
const { atualizaUsuario } = require("./controllers/atualizaUsuario")
const { deletaConta } = require("./controllers/deletaConta")
const { depositaValor } = require("./controllers/depositaValor")
const { sacaValor } = require("./controllers/sacaValor")
const { transferencia } = require("./controllers/transferencia")
const { saldo } = require("./controllers/saldo")
const { extrato } = require("./controllers/extrato")
const { validaSenhaQuery, validaSenhaBody } = require('./middlewares/validaSenha')
const { validaNovaConta, validaAtualizaConta } = require('./middlewares/validaConta')
const rota = express()


// 1 - Listar Contas Bancárias - /contas?senha_banco=Cubos123Bank
rota.get('/contas', validaSenhaQuery, listaContas)


//2 - Cria Conta
rota.post('/contas', validaNovaConta, criaConta)


//3 - Atualiza Usuário Conta - /contas/:numeroConta/usuario`
rota.put('/contas/:numeroConta/usuario', validaAtualizaConta, atualizaUsuario)


//4 - Deletar Conta - /contas/:numeroConta` 
rota.delete('/contas/:numeroConta', deletaConta)


//5 - Transação de deposito - /transacoes/depositar
rota.put('/transacao/depositar', depositaValor)


//6 - Transação de saque -/transacoes/sacar
rota.put('/transacao/sacar', validaSenhaBody, sacaValor)



//7 - Transferencia -/transacoes/transferir
rota.put('/transacao/transferir', transferencia)


//8 - Saldo - /contas/saldo?numero_conta=123&senha=123
rota.get('/contas/saldo', saldo)


//9 - Extrato - /contas/extrato?numero_conta=123&senha=123
rota.get('/contas/extrato', extrato)


//Exportar  
module.exports = rota;