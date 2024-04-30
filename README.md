Este projeto de estudo foi feito para poder testar os aprendizados do meu curso.
Criei um sistema bancário simples para que o usuário possa fazer as seguintes ações através de chamadas da API Rest
-   Criar conta bancária
-   Listar contas bancárias
-   Atualizar os dados do usuário da conta bancária
-   Excluir uma conta bancária
-   Depósitar em uma conta bancária
-   Sacar de uma conta bancária
-   Transferir valores entre contas bancárias
-   Consultar saldo da conta bancária
-   Emitir extrato bancário

Para esse projeto estou rodando basicamente através do Insomnia com alguns comandos simples para cada uma das atividades listadas acima.

![image](https://github.com/VFigueiredo97/Sistema-Banco/assets/157542261/d3eb37b6-fea3-4a90-9a98-02aef8f43608)

Como pode ver na imagem acima, basta ter um abiente que podemos direcionar para as rotas informadas.

Para exemplo de como testar, você pode tanto no insomnia como no seu ambiente local seguir os comandos abaixo para envio dos dados e validar que as operações funcionam:

**Criar conta bancária**
    ---> http://localhost:3000/contas?senha_banco=Cubos123Bank


**Listar contas bancárias**
    ---> http://localhost:3000/contas 
    ---> Vai precisar de um Body também, exemplo abaixo:
{
	"nome": "Chico Science",
	"cpf": "0095484554",
	"data_nascimento": "2021-03-15",
	"telefone": "7199991398888",
	"email": "mangue@town.com",
	"senha": "A12345"
}


**Atualizar os dados do usuário da conta bancária**
    ---> http://localhost:3000/contas/1/usuario
    ---> Vai precisar de um Body também, exemplo abaixo:
{
"nome": "Victor",
"cpf": "00012114142133312123574",
"data_nascimento": "2021-03-15",
"telefone": "71999998888",
"email": "foo121313@1bar4.com",
"senha": "12345"
}


**Excluir uma conta bancária**
    ---> http://localhost:3000/contas/1

**Depósitar em uma conta bancária**
    ---> http://localhost:3000/transacao/depositar
    ---> Vai precisar de um Body também, exemplo abaixo:

{
"numero_conta": "2",
"valor": 5000
}

**Sacar de uma conta bancária**
    ---> http://localhost:3000/transacao/sacar
    ---> Vai precisar de um Body também, exemplo abaixo:

{
"numero_conta": "2",
"valor": 1000,
"senha": "12345"
}

**Transferir valores entre contas bancárias**
    ---> http://localhost:3000/transacao/transferir
    ---> Vai precisar de um Body também, exemplo abaixo:
    
{
"numero_conta_origem": "2",
"numero_conta_destino": "1",
"valor": 5,
"senha": "12345"
}


**Consultar saldo da conta bancária**
    ---> http://localhost:3000/contas/saldo?numero_conta=1&senha=12345

**Emitir extrato bancário**
    ---> http://localhost:3000/contas/extrato?numero_conta=2&senha=12345


