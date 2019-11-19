// Dependencies
const express = require('express')
const path = require('path')
const app = express()
const bodyParser  = require('body-parser')
const port = process.env.PORT || 5000
const fs = require('fs')
const mongoose = require('mongoose')
const capteurs = require('./capteurs.json')

// Models
const Capteurs = require('./models/capteurs')
const Ensembles = require('./models/ensembles')
const Clients = require('./models/clients')
const Parcs = require('./models/parcs')

// Server
app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')))

// API
mongoose.Promise = global.Promise

const url = 'mongodb+srv://fcordon:CaptainElan2696@ariatis-qdoq8.mongodb.net/iot?retryWrites=true'

async function main() {
  const client = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  try {
    await client
    console.log('Connection established to MongoDB !')
  } catch (err) {
    console.dir(err)
  }
}

main().catch(console.dir)

//---->>>> GET ALL CLIENTS <<<<----
app.get('/clients', (req, res) => {
  Clients.find({}, function(err, client) {
    if(err) {
      throw err
    }
    res.json(client)
  })
})

//---->>>> GET ONE CLIENT <<<<----
app.get('/clients/:id', (req, res) => {
  Clients.find({_id: req.params.id}, function(err, client) {
    if(err) {
      throw err
    }
    res.json(client)
  })
})

//---->>>> POST CLIENTS <<<<----
app.post('/clients', (req, res) => {
  let addClient = req.body

  Clients.create(addClient, function(err, client) {
    if(err) {
      throw err
    }
    res.json(client)
  })
})

//---->>>> UPDATE CLIENTS <<<<----
app.put('/clients/:id', function(req, res) {
  let newData = req.body

  let update = {
    '$set': {
      nom: newData.nom,
      description: newData.description
    }
  };

  let options = {new: false};

  Clients.updateOne({_id: req.params.id}, update, options, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
})

//---->>>> DELETE CLIENTS <<<<----
app.delete('/clients/:id', function(req, res) {
  Clients.deleteOne({_id: req.params.id}, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
})

//---->>>> GET ALL PARCS <<<<----
app.get('/parcs/', (req, res) => {
  let parcsID = req.query.id

  if(parcsID !== undefined) {
    Parcs.find({clientID:parcsID}, function(err, parc) {
      if(err) {
        throw err
      }
      res.json(parc.length)
    })
  } else {
    Parcs.find({}, function(err, parc) {
      if(err) {
        throw err
      }
      res.json(parc)
    })
  }
})

//---->>>> GET ONE PARC <<<<----
app.get('/parcs/:id', (req, res) => {
  Parcs.find({_id: req.params.id}, function(err, client) {
    if(err) {
      throw err
    }
    res.json(client)
  })
})

//---->>>> POST PARCS <<<<----
app.post('/parcs', (req, res) => {
  let addParcs = req.body

  Parcs.create(addParcs, function(err, parc) {
    if(err) {
      throw err
    }
    res.json(parc)
  })
})

//---->>>> UPDATE PARCS <<<<----
app.put('/parcs/:id', function(req, res) {
  let newData = req.body

  let update = {
    '$set': {
      nom: newData.nom,
      description: newData.description
    }
  };

  let options = {new: false};

  Parcs.updateOne({_id: req.params.id}, update, options, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
})

//---->>>> DELETE PARCS <<<<----
app.delete('/parcs/:id', function(req, res) {
  Parcs.deleteOne({_id: req.params.id}, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
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

//---->>>> GET ONE CAPTEUR <<<<----
app.get('/capteurs/:id', (req, res) => {
  Capteurs.find({_id: req.params.id}, function(err, capteur) {
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + 'client/build/index.html'))
})
