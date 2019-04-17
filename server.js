const express = require('express')
const app = express()
const bodyParser  = require('body-parser')
const port = process.env.PORT || 5000
const fs = require('fs')
const capteurs = require('./capteurs.json')

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send(capteurs)
})

// create a POST route
app.post('/express_backend', (req, res, data) => {
  let addCapteur = JSON.stringify(req.body)

  fs.readFile('./capteurs.json', 'utf8', (err, data) => {
    // let obj = [JSON.parse(data)]
    data.push(addCapteur)
    // json = JSON.stringify(data)

    fs.writeFile('./capteurs.json', data, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved !')
    })
  })
})
