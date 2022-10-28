import http from 'http';
import express, { Express, Request, Response } from 'express';
import routes from './routes';

const router: Express = express();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req: Request, res: Response, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});


router.use('/', routes);

const httpServer = http.createServer(router);
httpServer.listen(3000, () => console.log(`🚀 Servidor rodando na porta 3000!`));