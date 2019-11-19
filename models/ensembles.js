const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nom: {type: String},
    capteurs: {type: Array}
}, { collection : 'ensembles' });

const Ensembles = mongoose.model('ensembles', userSchema);
module.exports = Ensembles;
