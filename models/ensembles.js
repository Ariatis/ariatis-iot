const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom: {type: String},
    capteurs: {type: Array}
});

const Ensembles = mongoose.model('ensembles', userSchema);
module.exports = Ensembles;
