import { Request, Response } from "express";
import { Coin } from "../interfaces/coin";
//A seguir, uma forma alternativa para se incluir o constructor, a criação de services
import { criptoMoedasDisponiveis, coinApi } from "../services/coinApi";

class CoinController {

    //Atenção: esta rota é muito pesada! O fornecedor do endpoint não fez nenhuma paginação/filtro.
    //Criada para verificar as moedas disponíveis para consulta
    static async getAvailableCoins(req: Request, res: Response) {
        const { data } = await coinApi.get("/coins/list");

        return res
            .status(200)
            .json({ success: true, msg: "✔️ Coins recovered successfully!", data });
    }

    static async convertCoin(req: Request, res: Response) {
        //Recuperando os parâmetros passados via url, sendo que a moeda é um parâmetro opcional
        let criptoMoeda: string = req.params.criptomoeda;
        let moeda: string = req.params.moeda;
            
        //vamos verificar se criptomoeda informada está na nossa listagem de criptomoedas válidas na nossa aplicação
        const filtroCriptoMoedasDisponiveis: Coin[] = criptoMoedasDisponiveis.filter(
            (x) => x.simbolo == criptoMoeda.toLocaleLowerCase()
        );

        //Métodologia conhecida como early return, que é o conceito de interromper a execução do nosso código quando algum
        //requerimento não é cumprido!
        if (filtroCriptoMoedasDisponiveis.length == 0) {
            //Percorrendo o array e extraindo apenas o simbolo, visando que se trata de um objeto
            //que contem id, simbolo e nome. Ao final transformamos o array em string usando o
            //join()
            const mapeamentoCriptoMoedasDisponiveis = criptoMoedasDisponiveis
                .map((coin) => coin.simbolo)
                .join(", ");

            return res
                .status(400)
                .json({
                    success: false,
                    msg: `❌ Falha! A criptomoeda informada não é válida! Valores aceitos: ${mapeamentoCriptoMoedasDisponiveis}`,
                });
        } else {
            //Caso a criptomoeda exista, vamos substituir a abreviação pelo ID da criptomoeda
            criptoMoeda = criptoMoedasDisponiveis[0].id
        }

        

        //array para armazenar as moedas disponíveis
        let moedasDisponiveis: string[] = [];
        
        //buscando todas as moedas de conversão disponíveis
        await coinApi.get("/simple/supported_vs_currencies")
            .then(({ data }) => {
                moedasDisponiveis = data;
            });

        //Caso o usuário queira ver a cripto moeda convertida em um valor específico, vamos tratar se é uma moeda de conversão válida
        if (moeda) {
            //vamos verificar se a moeda informada está na listagem de moedas válidas na API utilizada
            const filtroMoedasDisponiveis = moedasDisponiveis.filter(
                (x) => x == moeda.toLocaleLowerCase()
            )
    
            //early return mais uma vez
            if (filtroMoedasDisponiveis.length == 0) {
                //unindo o array e transformando em string
                const mapeamentoMoedasDisponiveis = moedasDisponiveis
                    .join(", ");
    
                return res
                    .status(400)
                    .json({
                        success: false,
                        msg: `❌ Falha! A moeda informada não é válida! Valores aceitos: ${mapeamentoMoedasDisponiveis}`,
                    });
            }        
        } else {
            //Caso o usuário não informe uma moeda de conversão, traremos a criptomoeda convertida para todas as moedas disponíveis
            //para isto, reutilizamos a variável moedasDisponiveis e damos um join no array, transformando ele em uma string!
            moeda = moedasDisponiveis.join(",");
        }

        //agora que já sabemos que todos os impedidores foram verificados, podemos consumir a api para fazer 
        //a conversão da moeda!        
        const { data } = await coinApi.get(`/simple/price?ids=${criptoMoeda}&vs_currencies=${moeda}`);

        return res
            .status(200)
            .json({
                success: true,
                msg: "✔️ Sucesso!",
                data,
            });
    }
}

export default CoinController;
