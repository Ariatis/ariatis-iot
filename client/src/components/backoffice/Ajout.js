import React, { Component } from 'react'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import axios from 'axios'

class Ajout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      client: {},
      parc: {},
      capteur: [],
      clientName: false,
      parcName: false
    }
  }

  inputName(e) {
    this.setState({ [e.target.name]: false })
  }

  newClient() {
    document.getElementById('ajout-client').style.display = 'block'
    document.getElementById('ajout-parc').style.display = 'none'
    document.getElementById('ajout-capteur').style.display = 'none'

    document.getElementById("ajout-capteur-form").reset()

    this.setState({
      client: {},
      parc: {},
      capteur: []
    })
  }

  newParc() {
    document.getElementById('ajout-parc').style.display = 'block'
    document.getElementById('ajout-capteur').style.display = 'none'

    document.getElementById("ajout-capteur-form").reset()

    this.setState({
      parc: {},
      capteur: []
    })
  }

  // CRUD Operations
  // --------->> Gestion des Clients <<---------
  addClient(e) {
    e.preventDefault()
    let clientName = document.getElementById('clientName').value
    let clientDesc = document.getElementById('clientDesc').value

    let data = {
      "nom": clientName,
      "description": clientDesc
    }

    clientName !== '' ? this.postClient(data) : this.setState({clientName: true})
  }

  postClient(data) {
    axios.post('/clients', data)
    .then(res => {
      this.setState({ client: {id:res.data._id, nom:res.data.nom, description:res.data.description} })
      document.getElementById('ajout-client').style.display = 'none'
      document.getElementById('ajout-parc').style.display = 'block'
      document.getElementById("ajout-client-form").reset()
    })
    .catch(err => console.log(err))
  }

  updateClient(id, data) {
    axios.put('/clients/' + id, data)
    .catch(err => console.log(err))
  }

  // --------->> Gestion des Parcs <<---------
  addParc(e) {
    e.preventDefault()
    let parcName = document.getElementById('parcName').value
    let parcDesc = document.getElementById('parcDesc').value

    let data = {
      "clientID": this.state.client.id,
      "nom": parcName,
      "description": parcDesc
    }

    parcName !== '' ? this.postParc(data) : this.setState({parcName: true})
  }

  postParc(data) {
    axios.post('/parcs', data)
    .then(res => {
      this.setState({ parc: {id:res.data._id, nom:res.data.nom, description:res.data.description} })
      document.getElementById('ajout-parc').style.display = 'none'
      document.getElementById('ajout-capteur').style.display = 'block'
      document.getElementById("ajout-parc-form").reset()
    })
    .catch(err => console.log(err))
  }

  updateParc(id, data) {
    axios.put('/parcs/' + id, data)
    .catch(err => console.log(err))
  }

  // --------->> Gestion des Capteurs <<---------
  addCapteur(e) {
    e.preventDefault()

    let nomCapteur = document.getElementById('nomCapteur').value
    let refModele = document.getElementById('refModele').value
    let constructeur = document.getElementById('constructeur').value
    let typeMesure = document.getElementById('typeMesure').value
    let uniteMesure = document.getElementById('uniteMesure').value
    let reseau = document.getElementById('reseau').value
    let latitude = document.getElementById('latitude').value
    let longitude = document.getElementById('longitude').value

    let data = {
      "clientID": this.state.client.id,
      "parcID": this.state.parc.id,
      "nom": nomCapteur,
      "refModele": refModele,
      "constructeur": constructeur,
      "typeMesure": typeMesure,
      "uniteMesure": uniteMesure,
      "reseau": reseau,
      "latitude": latitude,
      "longitude": longitude
    }

    if(nomCapteur !== '' && refModele !== '' && constructeur !== '' && typeMesure !== '' && uniteMesure !== '' && reseau !== '') {
      this.postCapteur(data)
    }
  }

  postCapteur(data) {
    axios.post('/capteurs', data)
    .then(res => {
      let newArray = [...this.state.capteur]
      newArray.push(data)
      this.setState({ capteur: newArray })
      document.getElementById("ajout-capteur-form").reset()
    })
    .catch(err => console.log(err))
  }

  updateCapteur(id, data) {
    axios.put('/capteurs/' + id, data)
    .catch(err => console.log(err))
  }

  render() {
    return (
      <section>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <Card id='ajout-client'>
                <Card.Header>
                  <Card.Title>Créer un client</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={this.addClient.bind(this)} id='ajout-client-form'>
                    <Form.Group controlId="clientName">
                      <Form.Control type="text" placeholder="Nom du client" onChange={this.inputName.bind(this)} />
                      {this.state.clientName && <Form.Text className="error">Vous devez entrer un nom pour votre client</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="clientDesc">
                      <Form.Control as="textarea" rows="3" placeholder="Description du client" />
                    </Form.Group>

                    <Button type="submit">Ajouter votre client</Button>
                  </Form>
                </Card.Body>
              </Card>

              <Card id='ajout-parc'>
                <Card.Header>
                  <Card.Title>Créer un parc</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={this.addParc.bind(this)} id='ajout-parc-form'>
                    <Form.Group controlId="parcName">
                      <Form.Control type="text" placeholder="Nom du parc" onChange={this.inputName.bind(this)} />
                      {this.state.parcName && <Form.Text className="error">Vous devez entrer un nom pour votre parc</Form.Text>}
                    </Form.Group>

                    <Form.Group controlId="parcDesc">
                      <Form.Control as="textarea" rows="3" placeholder="Description du parc" />
                    </Form.Group>

                    <Button type="submit">Ajouter votre parc</Button>
                  </Form>
                </Card.Body>
              </Card>

              <Card id='ajout-capteur'>
                <Card.Header>
                  <Card.Title>Ajouter un capteur</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={this.addCapteur.bind(this)} id='ajout-capteur-form'>
                    <Form.Group controlId="nomCapteur">
                      <Form.Label>Nom du capteur</Form.Label>
                      <Form.Control type="text" placeholder="Mon capteur 1" name='nomCapteur' />
                    </Form.Group>

                    <Form.Group controlId="refModele">
                      <Form.Label>Référence du modèle</Form.Label>
                      <Form.Control type="text" placeholder="Référence du capteur" name='refModele' />
                    </Form.Group>

                    <Form.Group controlId="constructeur">
                      <Form.Label>Constructeur</Form.Label>
                      <Form.Control type="text" placeholder="Constructeur du capteur" name='constructeur' />
                    </Form.Group>

                    <Form.Group controlId="typeMesure">
                      <Form.Label>Type de mesure</Form.Label>
                      <Form.Control as="select" name='typeMesure'>
                        <option>Pluviométrie</option>
                        <option>Vitesse</option>
                        <option>Température</option>
                        <option>Position GPS</option>
                        <option>Volume</option>
                        <option>Poids</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="uniteMesure">
                      <Form.Label>Unité de mesure</Form.Label>
                      <Form.Control as="select" name='uniteMesure'>
                        <option>mm</option>
                        <option>km/h</option>
                        <option>°C</option>
                        <option>Coordonnées GPS</option>
                        <option>m3</option>
                        <option>Kg</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="reseau">
                      <Form.Label>Réseau utilisé</Form.Label>
                      <Form.Control type="text" placeholder="Sigfox, ..." name='reseau' />
                    </Form.Group>

                    <Form.Group controlId="latitude">
                      <Form.Label>Latitude</Form.Label>
                      <Form.Control type="text" placeholder="2.294481" />
                    </Form.Group>

                    <Form.Group controlId="longitude">
                      <Form.Label>Longitude</Form.Label>
                      <Form.Control type="text" placeholder="48.858370" />
                    </Form.Group>

                    <Button type="reset">
                      Annuler
                    </Button>
                    <Button variant="primary" type="submit">
                      Enregistrer
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6}>
              <Card id='recap'>
                <Card.Header>
                  <Card.Title>Récapitulatif</Card.Title>
                </Card.Header>
                <Card.Body>
                  {this.state.client.nom !== undefined && <div className='recap-section'><h4 className='client-title'>Votre Client</h4><span className='client-name'>{this.state.client.nom}</span><br/><span className='client-desc'>{this.state.client.description}</span></div>}

                  {this.state.parc.nom !== undefined && <div className='recap-section'><h4 className='client-title'>Les Parcs</h4><span className='client-name'>{this.state.parc.nom}</span><br/><span className='client-desc'>{this.state.parc.description}</span></div>}

                  {this.state.capteur.length > 0 && <h4 className='client-title'>Liste des Capteurs</h4>}
                  {this.state.capteur.map((capteur, i) => <p key={i}>{capteur.nom}</p>)}
                </Card.Body>
              </Card>

              {this.state.capteur.length > 0 && <div><Button onClick={this.newParc.bind(this)}>Ajouter un nouveau parc</Button><Button onClick={this.newClient.bind(this)}>Créer un nouveau client</Button></div>}
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Ajout
