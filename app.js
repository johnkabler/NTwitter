
/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    routes = {
        index: require('./routes/index.js').index
       ,front: require('./routes/front.js')
    };

mongoose.connect('mongodb://localhost/blogdev');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BlogPost = new Schema({
    title : { type: String, required: true, trim: true },
    art : { type: String, required: true, trim: true },
    created : { type: Date, required: true }
});
var Post = mongoose.model('Post', BlogPost);
// test code for mongo connection below
var currentDate = new Date();
//garbage test data
var post_data = {
    title: 'john rules',
    art: 'yep that is right',
    created: currentDate
}

var post = new Post(post_data);
//test save
post.save ( function(error, data) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(data);
    }
});
/**
 var Person = mongoose.model('Person', Person);

 To save/insert data to a schema, we use the .save() function, which has a callback (as all other db interaction calls).

 var person_data = {
 first_name: req.params.first
 , last_name: req.params.last
 , username: req.params.username
 };

 var person = new Person(person_data);

 person.save( function(error, data){
 if(error){
 res.json(error);
 }
 else{
 res.json(data);
 }
 });

*/
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.front.frontget
);
app.post('/', routes.front.frontpost);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
