import express from 'express';
import mongoose from 'mongoose';
// import path from 'path';
import cookieParser from 'cookie-parser';
import { handler } from '../frontend/build/handler.js';
// const userRouter = require('./routes/UserRoutes');
import authRouter from './routes/AuthRoutes.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
// require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((_) => {
    console.log(`Connected to MongoDB`);
}).catch((error) => {
    console.log(error);
})

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')))

// For login (signing in), creating account (signing up), 
app.options('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:5173');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", ['X-Requested-With','content-type','credentials']);
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.status(200);
    next()
});

// User friends (like friends list actions and such)
// TODO: Create another route in the future

// User authentication (registering, logging in)
app.use("/api/auth", authRouter)

// Run both frontend and backend
app.use(handler);

app.listen(process.env.PORT || 3030, () => {
   console.log(`Server started at port ${process.env.PORT || 3030}`);
});


