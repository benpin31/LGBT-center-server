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
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
        origin: process.env.FRONT_END_URL,
        credentials: true
    })
)
//  to authorize the front to communicate with the back

app.use(
    session({
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {maxAge: 24*3600*1000} //new Date(Date.now() + (1000))}
    })
);

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

// for deployement
if (process.env.NODE_ENV === "production") {
    app.use("*", (req, res, next) => {
      // If no routes match, send them the React HTML.
      res.sendFile(__dirname + "/public/index.html");
    });
}

module.exports = app;
