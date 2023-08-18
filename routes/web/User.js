var express = require("express");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;
var multer = require("multer");
var crypto = require("crypto");
var path = require("path");
var User = require("../../models/user");
var fs = require('fs');

var router = express.Router();

router.use(ensureAuthenticated);



var storage = multer.diskStorage({
    destination: "./uploads/userimages",
    filename: function(res, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
        });
    }
});

var upload = multer({ storage: storage });




router.get("/", function(req, res) {
    User.findOne({ _id: req.user._id }).exec(function(err, user) {
        if (err) { console.log(err); }
        
        
        res.render("user/user", { user: user });

    });

});



router.post("/update", upload.single('image'), async function(req, res) {
    const user = await User.findById(req.body.userid);

   try {
    fs.unlinkSync(path.resolve(__dirname, "../../" +  user.userImage));
  }
  catch(err) {
   
  }
       
        
        user.username = req.body.username;
        user.password = req.body.password;
        user.personid = req.body.personid;
        user.tel = req.body.tel;
        user.address = req.body.address;
        user.birthdate=req.body.birthdate;
   
    if (req.file != null) {
        user.userImage = req.file.path;
    }




    try {
        let saveuser = await user.save();
        res.redirect("/" )
    } catch (err) {
        console.log("err happend");
        res.status(500).send(err);

    }



});

module.exports = router;