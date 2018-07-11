var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({ 
 name: { type: String },
 email: { type: String },
 password: { type: String }
 // genre: { type: String, enum: ['male', 'female'] }
});

module.exports = mongoose.model('Client', clientSchema);
