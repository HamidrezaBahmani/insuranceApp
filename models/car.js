var mongoose = require("mongoose");


var carSchema = mongoose.Schema({
    carName: { type: String, require: true },
    carColor: { type: String, require: false },
    carVin: { type: String, require: false },
    carChassisNum: { type: String, require: false },
    carEngineNum: { type: String, require: false },
    ManufactureDate: { type: Date, require: false },
    createdAt: { type: Date, default: Date.now },
    InsImage: { type: String, require: false, unique: false },
    carCardImageFront: { type: String, require: false, unique: false },
    carCardImageBack: { type: String, require: false, unique: false },
    userID: { type: mongoose.Types.ObjectId, require: false, unique: false },


});

var Car = mongoose.model("Car", carSchema);


module.exports = Car;