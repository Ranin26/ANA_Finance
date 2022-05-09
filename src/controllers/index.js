const { User } = require("../models");
const { Account } = require("../models");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");

exports.Signup = async (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
 try {
  console.log("trying");
   const { fname, lname, username, email, password, confirmpassword } = req.body;

   if(!req.session.errors){
      req.session.errors = [];
   }
   
   if(!req.session.successMsgs){
    req.session.successMsgs = [];
    }
   var errors = req.session.errors;
   var successMsgs = req.session.successMsgs;

  if(password == confirmpassword){

   //generate hash salt for password
   const salt = await bcrypt.genSalt(12);

   //generate the hashed version of users password
   const hashed_password = await bcrypt.hash(password, salt);

   const user = await User.create({ email, password: hashed_password, fname, lname, username }).catch(Sequelize.SequelizeUniqueConstraintError, function (err) {
      errors.push("User already exists");
   });
   if (user) {
      successMsgs.push("New user created!");
     //res.status(201).json({ message: "new user created!" });
      res.redirect("/login");
   } else {
     errors.push("User can't be created");
     //res.status(404).json({ message: "user can't be created" });
     res.redirect("/");
   }
  } else {
    //res.status(404).json({ message: "passwords don't match" });
    errors.push("Passwords don't match");
    res.redirect("/");
  }
 } catch (e) {
   console.log(e);
   res.status(500).send()
 }
};

exports.HomePage = async (req, res) => {
    if (!req.user) {
      return res.redirect("/");
    }
    const accounts = await Account.findAll({ where: { userId: req.user.id } });
    res.render("home", {
      sessionID: req.sessionID,
      sessionExpireTime: new Date(req.session.cookie.expires) - new Date(),
      isAuthenticated: req.isAuthenticated(),
      user: req.user,
      accounts: accounts,
    });
   };
   
exports.LoginPage = async (req, res) => {
  if (req.user) {
    return res.redirect("/home");
  }
  res.render("login", {
    successMsgs: req.session.successMsgs,
    errors: req.session.errors,
  });
  req.session.successMsgs = [];
};

exports.AboutPage = async (req, res) => {
  res.render("about", {
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });
};

exports.ContactPage = async (req, res) => {
  res.render("contact_us", {
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });
};

exports.registerPage = async (req, res) => {
  if (req.user) {
    return res.redirect("/home");
  }
  res.render("index", {
    errors: req.session.errors,
  });
  req.session.errors = [];
};

exports.Logout = (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect("/");
    });
   };