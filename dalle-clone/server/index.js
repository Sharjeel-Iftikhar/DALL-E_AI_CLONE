import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import Connection from './database/db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const PORT = 3000;
const starServer = async () => {
    try {
        Connection();
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

starServer();
