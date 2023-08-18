var express = require("express");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;
var multer = require("multer");
var crypto = require("crypto");
var path = require("path");




var fs = require('fs');

var Car = require("../../models/car");

var router = express.Router();

var storage = multer.diskStorage({
    destination: "./uploads/images",
    filename: function(res, file, cb) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname))
        });
    }
});

var upload = multer({ storage: storage });

router.use(ensureAuthenticated);


router.get("/", function(req, res) {
    Car.find({ userID: req.user._id }).exec(function(err, cars) {
        if (err) { console.log(err); }
        res.render("car/cars", { cars: cars });

    });



});






router.get("/add", function(req, res) {
   
    res.render("car/addcar");
  
   
    
});

// function willDelete {swal({
//     title: "Are you sure?",
//     text: "Are you sure that you want to delete this file?",
//     icon: "warning",
//     dangerMode: true,
//   });
   
//   if (willDelete) {
//     swal("Deleted!", "Your imaginary file has been deleted!", "success");
//   } } 

router.post("/add", function(req, res) {

    var newCar = new Car({
        carName: req.body.carName,
        carColor: req.body.carColor,
        carVin: req.body.carVin,
        carChassisNum: req.body.carChassisNum,
        carEngineNum: req.body.carEngineNum,
        ManufactureDate: req.body.ManufactureDate,
        userID: req.user._id,
    });


    newCar.save(function(err, car) {
        if (err) { console.log(err); }
        setTimeout(function() {
            res.redirect("/cars");
          }, 3000);
            

    })

    
    


});


router.get("/:carId", function(req, res) {
    Car.findById(req.params.carId).exec(function(err, car) {
        res.render("car/detailcar", { car: car });
    });
});

router.get("/edit/:carId", function(req, res) {
    Car.findById(req.params.carId).exec(function(err, car) {
        res.render("car/editcar", { car: car, carManufactureDate: car.ManufactureDate.toISOString().substring(0, 10) });
    });
});

router.get("/delete/:carId", function(req, res) {
    Car.findById(req.params.carId).exec(function(err, car) {
        if (err) { console.log(err); }
        try{ fs.unlinkSync(path.resolve(__dirname, "../../" + car.carCardImageFront));}catch{
            
        }
       
        Car.collection.deleteOne(car);
        res.redirect("/cars");
    });

});



router.post("/update", upload.single('image'), async function(req, res) {
    const car = await Car.findById(req.body.carid);
    car.carName = req.body.carName;
    car.carColor = req.body.carColor;
    car.carVin = req.body.carVin;
    car.carChassisNum = req.body.carChassisNum;
    car.carEngineNum = req.body.carEngineNum;
    car.ManufactureDate = req.body.ManufactureDate;
    if (req.file != null) {
        car.carCardImageFront = req.file.path;
    }




    try {
        let saveCar = await car.save();
        res.redirect("/cars/" + req.body.carid)
    } catch (err) {
        console.log("err happend");
        res.status(500).send(err);

    }



});



module.exports = router;