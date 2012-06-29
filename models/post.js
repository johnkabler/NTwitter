var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;
//Mongoose Schema
var BlogPost = new Schema({
    title : { type: String, required: true, trim: true },
    art : { type: String, required: true, trim: true },
    created : { type: Date, default: Date.now }
});
//Mongoose Model exported for use in views
module.exports = mongoose.model('Post', BlogPost);