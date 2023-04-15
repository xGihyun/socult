const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/UserRoutes');
const authRouter = require('./routes/AuthRoutes');
const app = express();

require('dotenv');

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
app.use(express.static(path.join(__dirname, 'public')))

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
app.use("/api/user", userRouter) 
// User authentication (registering, logging in)
app.use("/api/auth", authRouter)

app.listen(process.env.PORT || 3000, () => {
   console.log(`Server started at port ${process.env.PORT}\n`);
});


