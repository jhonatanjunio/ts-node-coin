import express from 'express';
import CoinController from './controllers/CoinController';
const router = express.Router();

//Rota MUITO pesada. Ela traz todas as moedas disponíveis. Apenas para fins de investigação
router.get("/get-coins", CoinController.getAvailableCoins)

//Rota para converter uma criptomoeda para uma moeda específica. A documentação está linha a linha na controller
router.get("/converter-moeda/:criptomoeda/:moeda?", CoinController.convertCoin)

export = router;