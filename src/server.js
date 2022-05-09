const express = require("express");
const session = require("express-session");
//const connectRedis = require("connect-redis");
const dotenv = require("dotenv").config()
//const { createClient } = require("redis");
const passport = require("passport");
const mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);

const app = express();
const PORT = 4300;

const router = require("./routes");
const { passportConfig } = require("./utils/passport");

//app middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'));

//Redis configurations

//Configure session middleware

const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(
session({
    secret: SESSION_SECRET,
	store: new MySQLStore({
        host: process.env.DB_HOST,
        port:3306,
        user:'root',
        password:'bowie2022',
        database:'ana_finance'
    }),
   resave: false,
   saveUninitialized: false,
   cookie: {
     secure: false,  // if true only transmit cookie over https
     httpOnly: false, // if true prevent client side JS from reading the cookie
     maxAge: 1000 * 60 * 10, // session max age in milliseconds
   },
 })
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

//Router middleware
app.use(router);

app.listen(PORT, () => {
 console.log(`Server started at port ${PORT}`);
});