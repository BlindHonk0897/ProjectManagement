const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const assert = require('assert');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

const login = require('./routes/loginRoutes/loginRoute.js');
const ManagerGetRoutes = require('./routes/managerRoutes/getRoutes');
const ManagerPostRoutes = require('./routes/managerRoutes/postRoutes');
const SecretaryGetRoutes = require('./routes/secretaryRoutes/getRoutes');
const ClientGetRoutes = require('./routes/clientRoutes/getRoutes');
const ClientPostRoutes = require('./routes/clientRoutes/postRoutes');
const sockets = require('./public/controller/chatController');
sockets(io);

var mongoUtil = require( './public/assets/scripts/mongdb' );

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(session({
    secret:'this my sample session',
    username:"",
    isLogin:false,
    resave:false,
    saveUninitialized:true
}));
app.use(flash());

login(app);
ManagerGetRoutes(app);
ManagerPostRoutes(app);
SecretaryGetRoutes(app);
ClientGetRoutes(app);
ClientPostRoutes(app);

const port = process.env.PORT || 3000;
mongoUtil.connectToServer( function( err, client ) {
    if (err) console.log("NOT CONNECTED TO DATABASE");
      assert.equal(null, err);
      app.listen(port,(err,res)=>{console.log(`Listening to port ${port}.....`)});
  });