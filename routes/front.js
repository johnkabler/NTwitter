/**
 * Created with JetBrains WebStorm.
 * User: john.kabler
 * Date: 6/4/12
 * Time: 6:09 AM
 * To change this template use File | Settings | File Templates.
 */
    //importing the Post model from the mongoose blogpost model defined in models/post.js
var Post = require('../models/post.js');
exports.frontget = function(req, res) {
    //capture list of all posts from mongoDB
    var list = Post.find(function(err, posts){
        console.log(posts);
    });
    // Render the front template
    res.render('front', {title: '', art:'', error: ''})
};

exports.frontpost = function(req,res) {
    var title = req.body.title;
    var art = req.body.art;
    /** Error Handling
     *  If the user has entered title and art, then
     *  save to database (MongoDB)
     *  Else, spit back an error message that renders in the front page
     *  */
    if(title && art)
    {
        var currentDate = new Date();
        var post_data = {
            title: title,
            art: art,
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
       //res.send(title + " " + art);
        res.render('front', {title: title, art: art, error: ''});
    }
    else{
        var error = 'You need both title and art'
        res.render('front.jade',{error: error} )
    }
};