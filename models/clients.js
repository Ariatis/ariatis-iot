const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom: {type: String},
    description: {type: String}
});

const Clients = mongoose.model('clients', userSchema);
module.exports = Clients;
