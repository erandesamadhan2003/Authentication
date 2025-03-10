import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connectToDataBase } from './database/dataBase.js';
import { AuthRouter } from './routes/AuthRoutes.js';
import { homeRouter } from './routes/homeRoutes.js';
import { adminrouter } from './routes/AdminRoutes.js';
import { ImageRoute } from './routes/imageRoutes.js';


connectToDataBase();
const app = express();
const PORT = process.env.PORT;

// middlewares 
app.use(express.json());

app.use('/api/auth', AuthRouter);
app.use('/api/home', homeRouter);
app.use('/api/admin', adminrouter);
app.use('/api/image', ImageRoute)


app.listen(PORT, () => {
    console.log(`Port is running on the port ${PORT}`);
}) 