// Dependencies
const express = require('express')
const app = express()
const bodyParser  = require('body-parser')
const port = process.env.PORT || 5000
const fs = require('fs')
const mongoose = require('mongoose')
const capteurs = require('./capteurs.json')

// Models
const Capteurs = require('./models/capteurs')
const Ensembles = require('./models/ensembles')

// Server
app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// API
mongoose.Promise = global.Promise

const url = 'mongodb+srv://fcordon:CaptainElan2696@ariatis-qdoq8.mongodb.net/iot?retryWrites=true'

async function main() {
  const client = mongoose.connect(url, { useNewUrlParser: true })

  try {
    await client
    console.log('Connection established to MongoDB !')
  } catch (err) {
    console.dir(err)
  }
}

main().catch(console.dir)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'client/build/index.html'))
})

//---->>>> GET ALL CAPTEURS <<<<----
app.get('/capteurs', (req, res) => {
  Capteurs.find({}, function(err, capteur) {
    if(err) {
      throw err
    }
    res.json(capteur)
  })
})

//---->>>> POST CAPTEUR <<<<----
app.post('/capteurs', (req, res) => {
  let addCapteur = req.body

  Capteurs.create(addCapteur, function(err, capteur) {
    if(err) {
      throw err
    }
    res.json(capteur)
  })
})

//---->>>> GET ALL ENSEMBLES <<<<----
app.get('/ensembles', (req, res) => {
  Ensembles.find({}, function(err, ensemble) {
    if(err) {
      throw err
    }
    res.json(ensemble)
  })
})

//---->>>> POST ENSEMBLES <<<<----
app.post('/ensembles', (req, res) => {
  let addCapteur = req.body

  Ensembles.create(addCapteur, function(err, ensemble) {
    if(err) {
      throw err
    }
    res.json(ensemble)
  })
})

//---->>>> UPDATE ENSEMBLES <<<<----
app.put('/ensembles/:nom', function(req, res) {
  let newData = req.body

  let update = {
    '$set': {
      capteurs: newData
    }
  };

  let options = {new: false};

  Ensembles.updateOne({nom: req.params.nom}, update, options, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
})

//---->>>> DELETE ENSEMBLES <<<<----
app.delete('/ensembles/:nom', function(req, res) {
  Ensembles.deleteOne({nom: req.params.nom}, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
})
