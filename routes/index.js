
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'John Kabler\'s Two Cents'})
};