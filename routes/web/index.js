var express = require("express");
var router = express.Router();

//Adding err and info
var adminRouter = require("./admin.router");





router.use(function(req, res, next) {
    res.locals.currentUser = req.user;

    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");

    next();
})

router.use("/", require("./home"));
router.use("/posts", require("./post"));
router.use("/user", require("./User"));
router.use("/cars", require("./car"));




router.use("/admin", require("./admin.router"));

module.exports = router;