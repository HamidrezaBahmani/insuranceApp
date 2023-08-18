var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../../models/user");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;




router.get("/", function(req, res) {

    res.render("home/index");
});


router.get("/home", function(req, res) {
    res.render("home/home");
});
router.get("/FAQ", function(req, res) {
    res.render("home/FAQ");
});

router.get("/signup&loging", function(req, res) {
    res.render("home/signup&loging");
});


router.get("/about", function(req, res) {
    res.render("home/about");
});
router.get("/glorygallery", function(req, res) {
   
    res.render("home/glorygallery");
});




router.get("/login", function(req, res) {
    res.render("home/login");
});
router.get("/tools", function(req, res) {
    res.render("home/tools");
});


router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/")
})

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup&loging",
    failureFlash: true
}));

router.get("/signup", function(req, res) {
    res.render("home/signup");
});


router.post("/signup", function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email }, function(err, user) {
        if (err) { return next(err); }
        if (user) {
            req.flash("error", "حساب کاربری با این ایمیل وجود دارد");
            return res.redirect("/signup&loging");
        }
    });

    var newUser = new User({
        username: username,
        password: password,
        email: email,
    });


    newUser.save(next);
}, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup&loging",
    failureFlash: true
}));


module.exports = router;