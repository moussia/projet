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


// passportInit(passport);

// //configure_express_session 
// const sessionMiddleware = session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 30 * 24 * 60 * 60 * 1000, // la session va durer 30 jours
//         // sameSite: 'lax',
//         sameSite: 'none',
//         secure: 'auto',
//         httpOnly: true
//     }
// });

// app.use(sessionMiddleware);
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/user', userRouter);

app.listen(process.env.PORT, () => {
    console.log(`✅ App listening on port ${process.env.PORT}`)
})


export default {
    app,
};