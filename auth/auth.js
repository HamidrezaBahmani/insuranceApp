var ensureAuth = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "برای مشاهده این صفحه باید وارد حساب کاربری خود شوید");
        res.redirect("/signup&loging");
    }

}

module.exports = { ensureAuthenticated: ensureAuth }