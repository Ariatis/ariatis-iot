import React, { Component } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import axios from 'axios'

class AjoutCapteur extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  onFormSubmit(e) {
    e.preventDefault()

    let nomCapteur = document.getElementById('nomCapteur').value
    let refModele = document.getElementById('refModele').value
    let constructeur = document.getElementById('constructeur').value
    let typeMesure = document.getElementById('typeMesure').value
    let uniteMesure = document.getElementById('uniteMesure').value
    let reseau = document.getElementById('reseau').value
    let positionGps = document.getElementById('positionGps').value

    let data = {
      "nomCapteur": nomCapteur,
      "refModele": refModele,
      "constructeur": constructeur,
      "typeMesure": typeMesure,
      "uniteMesure": uniteMesure,
      "reseau": reseau,
      "positionGps": positionGps
    }

    axios.post('http://localhost:5000/express_backend',data)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <section id="home">
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

                    <Form.Group controlId="positionGps">
                      <Form.Label>Position GPS</Form.Label>
                      <Form.Control type="text" placeholder="x:2.294481 y:48.858370" />
                    </Form.Group>

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
