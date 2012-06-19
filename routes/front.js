/**
 * Created with JetBrains WebStorm.
 * User: john.kabler
 * Date: 6/4/12
 * Time: 6:09 AM
 * To change this template use File | Settings | File Templates.
 */

exports.frontget = function(req, res) {
    res.render('front', {title: '', art:'', error: ''})
};

exports.frontpost = function(req,res) {
    var title = req.body.title;
    var art = req.body.art;
    /** Error Handling
     *  If the user has entered title and art, then
     *  print on screen.
     *  Else, spit back an error message that renders in the front page
     *  */
    if(title && art)
    {
       //res.send(title + " " + art);
        res.render('front', {title: title, art: art, error: ''});
    }
    else{
        var error = 'You need both title and art'
        res.render('front.jade',{error: error} )
    }
};