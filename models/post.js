var mongoose = require("mongoose");


var postSchema = mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: false },
    createdAt: { type: Date, default: Date.now },
    image: { type: String, require: false, unique: false },
    userID: { type: mongoose.Types.ObjectId, require: false, unique: false },
    public: { type: Boolean, default: false, require: false, unique: false },
    contactemail: { type: String, required: false, },

});

var Post = mongoose.model("Post", postSchema);


module.exports = Post;