# TS NODE COIN
Projeto criado no intuito de demonstrar e praticar o básico de TypeScript.

## Requisitos

- Node JS
- TSC

## Instalação/configuração

Para ver o projeto funcionando em seu ambiente, siga os passos:

- Clone o projeto<br/>
- Certifique-se de que tem os requisitos em seu ambiente<br/>
- Execute o comando `npm i` para instalar todas as dependências do projeto<br/>
- Execute o comando `npm run dev` para que o projeto inicie na porta 3000 !<br/>
- Por estarmos rodando o comando tsc-node-dev, o servidor estará escutando alterações no código. Basta alterar o código, salvar e ver o resultado do código na próxima requisição feita no browser apontada para o caminho da aplicação!

## Mais informações

Para que não ficasse pesado o fluxo principal da aplicação (conversão de moedas) e até mesmo para exemplificar a criação de Interfaces em TypeScript, foram limitadas as seguintes criptomoedas para conversão: `bitcoin`, `ethereum`, `dogecoin`. Isto pode ser alterado no arquivo `src/services/coinApi.ts`.

## Rotas

`/get-coins` → retorna todas as criptomoedas disponíveis para fazer conversão. ATENÇÃO: esta rota é MUITO pesada. Demora bastante para renderizar o resultado, devido ao próprio serviço de API escolhido para este material. <br/>
`/converter-moeda/:criptomoeda/:moeda?` → nesta rota acontece a conversão de moedas! O primeiro parâmetro, `criptomoeda`, é obrigatório, porém o parâmetro `moeda` é opcional. Quando não é informado na URL, serão exibidos os preços da criptomoeda convertida em cada uma das moedas disponíveis. Exemplo de chamada em um ambiente localhost: `http://localhost:3000/converter-moeda/btc/brl`. 

<br/><br/>
Bons estudos! <br/><br/>

##### Made with 💜 by [Jhonatan](https://github.com/jhonatanjunio)
