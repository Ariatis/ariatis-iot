import React, { Component } from 'react'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getClients } from '../../actions/ClientAction'
import { getParcs } from '../../actions/ParcAction'
import { postCapteur } from '../../actions/CapteurAction'

class AddCapteur extends Component {
  constructor(props) {
    super(props)

    this.props.getClients()
    this.props.getParcs()

    this.state = {
      capteurName: false
    }
  }

  inputName(e) {
    this.setState({ [e.target.name]: false })
  }

  // CRUD Operations
  addCapteur(e) {
    e.preventDefault()

    let clientID = document.getElementById('client').value
    let parcID = document.getElementById('parc').value
    let nomCapteur = document.getElementById('nomCapteur').value
    let refModele = document.getElementById('refModele').value
    let constructeur = document.getElementById('constructeur').value
    let typeMesure = document.getElementById('typeMesure').value
    let uniteMesure = document.getElementById('uniteMesure').value
    let reseau = document.getElementById('reseau').value
    let latitude = document.getElementById('latitude').value
    let longitude = document.getElementById('longitude').value

    let data = {
      "clientID": clientID,
      "parcID": parcID,
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
    this.props.postCapteur(data)
    document.getElementById("ajout-capteur-form").reset()
  }

  render() {
    return (
      <section>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
            <Card>
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

                  <Form.Group controlId="client">
                    <Form.Label>Client</Form.Label>
                    <Form.Control as="select" name='client'>
                      {this.props.clients.map((client, i) => <option key={i} value={client._id}>{client.nom}</option>)}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="parc">
                    <Form.Label>Parc</Form.Label>
                    <Form.Control as="select" name='parc'>
                      {this.props.parcs.map((parc, i) => <option key={i} value={parc._id}>{parc.nom}</option>)}
                    </Form.Control>
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
          </Row>
        </Container>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients.clients,
    parcs: state.parcs.parcs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClients,
    getParcs,
    postCapteur
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCapteur)
