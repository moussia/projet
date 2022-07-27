import 'dotenv/config';
import express from 'express';
import './conf/database.js';
import cors from 'cors';

const app = express();
app.set('trust proxy', 1);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
        limit: '30mb'
    })
);

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000', process.env.URL_FRONT]
    })
);


app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`✅ App listening on port ${process.env.PORT}`)
})


export default {
    app,
};