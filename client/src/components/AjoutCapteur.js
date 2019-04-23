import React, { Component } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import axios from 'axios'

class AjoutCapteur extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addBdd: false,
      errorBdd: false
    }
  }

  onFormSubmit(e) {
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
      "nom": nomCapteur,
      "refModele": refModele,
      "constructeur": constructeur,
      "typeMesure": typeMesure,
      "uniteMesure": uniteMesure,
      "reseau": reseau,
      "latitude": latitude,
      "longitude": longitude
    }

    axios.post('/capteurs', data)
    .then(response => {
      response.status === 200 ? this.setState({addBdd: true, errorBdd: false}) : this.setState({addBdd: false, errorBdd: true})
    })
    .then(this.setState({addBdd: false, errorBdd: false}))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <section id="ajout-capteur">
        <Container>
          <Row>
            <Col xs={12} md={{ span:6, offset:3 }}>
              <Card>
                <Card.Header>
                  <Card.Title>
                    Ajouter un nouveau capteur
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={this.onFormSubmit.bind(this)}>
                    <Form.Group controlId="nomCapteur">
                      <Form.Label>Nom du capteur</Form.Label>
                      <Form.Control type="text" placeholder="Mon capteur 1" />
                    </Form.Group>

                    <Form.Group controlId="refModele">
                      <Form.Label>Référence du modèle</Form.Label>
                      <Form.Control type="text" placeholder="Référence du capteur" />
                    </Form.Group>

                    <Form.Group controlId="constructeur">
                      <Form.Label>Constructeur</Form.Label>
                      <Form.Control type="text" placeholder="Constructeur du capteur" />
                    </Form.Group>

                    <Form.Group controlId="typeMesure">
                      <Form.Label>Type de mesure</Form.Label>
                      <Form.Control as="select">
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
                      <Form.Control as="select">
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
                      <Form.Control type="text" placeholder="Sigfox, ..." />
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
          </Row>
        </Container>
      </section>
    );
  }
}

export default AjoutCapteur;
