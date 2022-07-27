const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { createServer } from "http";
import { Server } from "socket.io";
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import './conf/database.js';
import passport from 'passport';
import { passportInit } from './conf/passport.js';
import cors from 'cors';
import proRouter from './routes/pro.js';

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
        // origin: [process.env.URL_FRONT]
    })
);

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        credentials: true,
        // origin: process.env.URL_FRONT,
        origin: ["http://localhost:3000", process.env.URL_FRONT]
    },
});



httpServer.listen(process.env.PORT, () => {
    console.log(`✅ App listening on port ${process.env.PORT}`)
})


export default {
    app,
};