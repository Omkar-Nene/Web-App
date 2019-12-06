var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

var control = require('./controller/control.js');
//var profile = require('./controller/profile.js');

const session = require('express-session');
//console.log("IN APP.JS")
app.use(session({secret : 'session-secret'}));

//app.use('/profile',profile);
app.use('/',control);

module.exports = app;

app.listen(8080,function(){
  console.log('listening to port 8080');
});
