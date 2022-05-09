const express = require("express");
const {
 Signup,
 HomePage,
 LoginPage,
 registerPage,
 Logout,
 AboutPage,
 ContactPage,
} = require("../controllers");
const passport = require("passport");

const router = express.Router();

router.route("/").get(registerPage);
router.route("/login").get(LoginPage);
router.route("/index").get(registerPage);
router.route("/about").get(AboutPage);
router.route("/contact_us").get(ContactPage);
router.route("/home").get(HomePage);
router.route("/api/v1/signin").post(
 passport.authenticate("local", {
   failureRedirect: "/login",
   successRedirect: "/home",
 }),
 function (req, res) {
   if(req.failureRedirect){
    req.session.errors = req.session.errors || [];
    req.session.errors.push("Invalid credentials.");
   }
 }
);
router.route("/api/v1/signup").post(Signup);
router.route("/logout").get(Logout);

module.exports = router;
