//server.js
'use strict';

//first we import our dependencies…
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let api = require('./Routes/API');


// create reusable transporter object using the default SMTP transport
//and create our instances
let app = express();
let router = express.Router();

//set our port to either a predetermined port number if you have set
//it up, or 3001
let port = process.env.PORT || 3001;
let dbURL = process.env.MONGOLAB_URI || "mongodb://switchserveruser:switchserveruser@ds141264.mlab.com:41264/switchserver" ; // "localhost:27017/switchserver";

// mongoose.connect(dbURL);
// var promise = mongoose.createConnection(dbURL, {
//   useMongoClient: true,
//   /* other options */
// });
mongoose.connect(dbURL);


console.log("Database connection Established at "+dbURL);

//now we should configure the API to use bodyParser and look for
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});    
});	
//now we can set the route path & initialize the API
                              //adding the /comments route to our /api router
router.get('/trail', function(req, res) {
    res.json({ message: 'API Initialized!'});  
    console.log("Asdfas");  
});	
//Use our router configuration when we call /api
app.use('/API', api);

//starts the server and listens for requests
app.listen(port, function() {
    console.log('api running on port '+ port);			
});
