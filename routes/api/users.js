var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.json("this is ajson status for the user api");
});


module.exports = router;