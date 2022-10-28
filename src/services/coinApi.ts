import axios, { Axios } from "axios";
import { Coin } from "../interfaces/coin";
//Neste contexto, podemos reaproveitar este arquivo para fazer a chamada de diferentes rotas da API externa
//usando a mesma URL base. 
// Reduzimos a importação de uma lib (axios) para uma única vez e reaproveitamos a importação em cada arquivo
// que importar /src/services/coinApi.ts
export const coinApi: Axios = axios.create({
  baseURL: "https://api.coingecko.com/api/v3"
});

//Filtro utilizado para sabermos quais moedas vamos permitir serem consultadas na nossa aplicação
export const criptoMoedasDisponiveis:Coin[] = [
    {id: "bitcoin", simbolo: "btc", nome: "Bitcoin"},
    {id: "ethereum", simbolo: "eth", nome: "Ethereum"},
    {id: "dogecoin", simbolo: "doge", nome: "Dogecoin"},
]
