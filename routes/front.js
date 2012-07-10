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
        if(err) {
            console.log(err);
        } else {
        console.log(posts);
        res.render('front', {posts:posts, error: ''})}
    });
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
        };

        var post = new Post(post_data);
//test save
        post.save ( function(error, data) {
            if (error)
            {
                console.log(error);
            }
            else
            {
                console.log(data);
                var list = Post.find(function(err, posts)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log(posts);
                        res.render('front', {title: '', art: '', error: '', posts:posts});
                    }
                });
            }
        });

    }
    else{
        var error = 'You need both title and art'
        var list = Post.find(function(err, posts)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(posts);
                res.render('front', {title: req.body.title, art: req.body.art, error: error, posts:posts});
            }
        });

    }
    };