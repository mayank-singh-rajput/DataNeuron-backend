import express, { Express, Request, Response } from 'express';
import { PORT } from './config';
import { connectDB } from './database/index';
import configureExpress from './express-config';


const StartServer = async (): Promise<void> => {
    const app: Express = express();

    await connectDB();

    await configureExpress(app);

    app.listen(PORT, () => {
        console.log(`Listening on port http://localhost:${PORT}/`);
    }).on('error', (err) => {
        console.log(err);
        process.exit(1);
    });
}

StartServer();