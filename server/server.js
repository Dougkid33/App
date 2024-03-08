import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router/userRouter.js';
import keyRouter from './router/keysRouter.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/usuario', router);
app.use('/api/chaves', keyRouter);



app.listen(3333, () => {
    console.log('Server started on http://localhost:3333');
});

