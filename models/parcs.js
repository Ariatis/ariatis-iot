const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  clientID: {type: String},
  nom: {type: String},
  description: {type: String}
}, { collection : 'parcs' });

const Parcs = mongoose.model('parcs', userSchema);
module.exports = Parcs;
