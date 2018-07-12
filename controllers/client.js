var mongoose = require('mongoose');
var Client = mongoose.model('Client');

//GET - Return all registers
exports.findAll = function(req, res) {
	Client.find(function(err, clients) {
		if(err) res.send(500, err.message);
		console.log('GET /clients')
	res.status(200).jsonp(clients);
	});
};

//GET - Return a register with specified ID
exports.findById = function(req, res) {
	Client.findById(req.params.id, function(err, client) {
		if(err) return res.send(500, err.message);
			console.log('GET /clients/' + req.params.id);
			// console.log(client);
			res.status(200).jsonp(client);
	});
};

exports.find = function(req, res) {
	Client.find({},'email '+req.params.email, function(err, client) {
		if(err) return res.send(500, err.message);
		if (client[0].password == req.params.pass) {
			res.status(200).jsonp(true);
		}else{
			res.status(200).jsonp(false);
		}
	});
};

//POST - Insert a new register
exports.add = function(req, res) {
	console.log('POST');
	console.log(req.body);
	var client = new Client({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});
	client.save(function(err, client) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(client);
	});
};

//PUT - Update a register already exists
exports.update = function(req, res) {
	Client.findById(req.params.id, function(err, client) {
		client.name = req.body.name;
		client.email = req.body.email;
		client.password = req.body.password;
		client.save(function(err) {
			if(err) return res.send(500, err.message);
			res.status(200).jsonp(client);
		});
	});
};

//DELETE - Delete a register with specified ID
exports.delete = function(req, res) {
	Client.findById(req.params.id, function(err, client) {
		client.remove(function(err) {
			if(err) return res.send(500, err.message);
			res.json({ message: 'Successfully deleted' });
		});
	});
};
