const config = require('config');
var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
const methodOverride = require('method-override');
// var params = require("./params/params");



var setUpPassport = require("./setuppassword");
if (!config.get("DATABASECONNECTION")) {
    console.error("FATAL ERROR:DATABASECONNECTION Key is not defind.");
    process.exit(1);
}


var app = express();


mongoose.connect(config.get('DATABASECONNECTION'), { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
setUpPassport();
app.set("port", process.env.PORT || 3000);
app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser, urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
    secret: "ghjhgfg15!jkjbjh",
    resave: false,
    saveUninitialized: false

}));

app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));





app.use(passport.initialize());
app.use(passport.session());
app.use(flash());






app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.use(express.static('public'));



app.listen(app.get("port"), function() {
    console.log("server started on port " + app.get("port"));
});