
/**
 * Module dependencies.
 */

var express = require('express'),
    everyauth = require('everyauth'),
    mongoose = require('mongoose'),
    conf = require('./conf.js'),
    config = require('./config.js'),
    routes = {
        index: require('./routes/index.js').index
       ,front: require('./routes/front.js')
    };

mongoose.connect(config.creds.mongoose_auth);

// The code below is for everyauth.  Need to eventually make this work with MongoDB instead of in memory
var usersById = {};
var nextUserId = 0;
var usersByTwitId = {};
var usersByFbId = {};
var usersByGhId = {};

everyauth
    .twitter
    .consumerKey(conf.twit.consumerKey)
    .consumerSecret(conf.twit.consumerSecret)
    .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
        return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    })
    .redirectPath('/');

everyauth.facebook
    .appId(conf.fb.appId)
    .appSecret(conf.fb.appSecret)
    .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
        return usersByFbId[fbUserMetadata.id] || (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
    })
    .redirectPath('/');

everyauth.github
    .appId(conf.github.appId)
    .appSecret(conf.github.appSecret)
    .findOrCreateUser( function (sess, accessToken, accessTokenExtra, ghUser) {
        return usersByGhId[ghUser.id] || (usersByGhId[ghUser.id] = addUser('github', ghUser));
    })
    .redirectPath('/');
//Need to eventually make the code below work with the database, including having a user created in MongoDB
function addUser (source, sourceUser) {
    var user;
    if (arguments.length === 1) { // password-based
        user = sourceUser = source;
        user.id = ++nextUserId;
        return usersById[nextUserId] = user;
    } else { // non-password-based
        user = usersById[++nextUserId] = {id: nextUserId};
        user[source] = sourceUser;
    }
    return user;
}

everyauth.debug = true;



var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'foobar' }));
  app.use(express.bodyParser());
  app.use(everyauth.middleware());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  everyauth.helpExpress(app);
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
