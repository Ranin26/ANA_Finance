const session = require("express-session");
//const connectRedis = require("connect-redis");
const dotenv = require("dotenv").config()
//const { createClient } = require("redis");
const passport = require("passport");
const mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);