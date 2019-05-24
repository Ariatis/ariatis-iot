const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    clientID: {type: String},
    parcID: {type: String},
    nom: {type: String},
    refModele: {type: String},
    constructeur: {type: String},
    typeMesure: {type: String},
    uniteMesure: {type: String},
    reseau: {type: String},
    latitude: {type: Number},
    longitude: {type: Number}
});

const Capteurs = mongoose.model('capteurs', userSchema);
module.exports = Capteurs;
