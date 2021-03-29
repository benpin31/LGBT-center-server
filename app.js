require("dotenv").config();
require("./config/mongo");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const cors = require("cors");
const getDevEnvironment = require("./middlewares/devEnvironment")
const app = express();




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
        origin: process.env.FRONT_END_URL ,
        credentials: true
    })
)

app.use(
    session({
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: new Date(Date.now() + (30 * 86400 * 1000))}
        // cookie: {maxAge: new Date(Date.now() + (30 * 86400 * 1000))}
        // cookie: {maxAge: 8000000}
    })
);

// app.use(getDevEnvironment) ;

const authRouter = require('./routes/auth');
const userRouter = require("./routes/user");
const categoriesRouter = require('./routes/categories');
const contactTypesRouter = require('./routes/contactTypes');
const visitsRouter = require("./routes/visits");
const insightRouter = require("./routes/insight")


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/contactTypes', contactTypesRouter);
app.use('/api/visits', visitsRouter);
app.use('/api/insight', insightRouter)


module.exports = app;
