var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
// var cookieParser = require('cookie-parser');
const cors = require('cors');
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
var app = express();
app.use(cors(corsOptions));
// app.use(cookieParser());
// Connection to DB
mongoose.connect('mongodb://localhost/clients', function(err, res) {
 if(err) throw err;

 console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(methodOverride());

// Import Models and Controllers
var models = require('./models/client');//(app, mongoose);
var ClientCtrl = require('./controllers/client');

var router = express.Router();

// Index - Route
router.get('/', function(req, res, next) {
	console.log('lsls') 
 res.jsonp("Hola Mundo - www.programacion.com.py");
 // next();
});

app.use(router);

// API routes
var api = express.Router();

api.route('/clients') 
 .get(ClientCtrl.findAll)
 .post(ClientCtrl.add);

api.route('/clients/:id') 
 .get(ClientCtrl.findById)
 .put(ClientCtrl.update)
 .delete(ClientCtrl.delete);

api.route('/clientsF/') 
 .get(ClientCtrl.find);

app.use('/api', api);


// Start server
app.listen(3080, function() {
 console.log("Node server running on http://localhost:3080");
});