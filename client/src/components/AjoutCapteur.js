import React, { Component } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap'
import axios from 'axios'

class AjoutCapteur extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addBdd: false,
      errorBdd: false,
      nomCapteur: {value:'', isValid:false, msg:'Veuillez ajouter un nom à votre capteur'},
      refModele: {value:'', isValid:false, msg:'Veuillez ajouter la référence de votre capteur'},
      constructeur: {value:'', isValid:false, msg:'Veuillez ajouter le constructeur de votre capteur'},
      typeMesure: {value:'', isValid:false, msg:'Veuillez sélectionner le type de mesure de votre capteur'},
      uniteMesure: {value:'', isValid:false, msg:'Veuillez sélectionner l\'unité de mesure de votre capteur'},
      reseau: {value:'', isValid:false, msg:'Veuillez renseigner le réseau utilisé'},
      validForm: true
    }
  }

  onValueChanged(e) {
    this.setState({ [e.target.name]: {value:e.target.value, isValid:true}, addBdd: false, errorBdd: false })
  }

  onFormSubmit(e) {
    e.preventDefault()

    let latitude = document.getElementById('latitude').value
    let longitude = document.getElementById('longitude').value

    let data = {
      "nom": this.state.nomCapteur.value,
      "refModele": this.state.refModele.value,
      "constructeur": this.state.constructeur.value,
      "typeMesure": this.state.typeMesure.value,
      "uniteMesure": this.state.uniteMesure.value,
      "reseau": this.state.reseau.value,
      "latitude": latitude,
      "longitude": longitude
    }

    if(this.state.nomCapteur.isValid && this.state.refModele.isValid && this.state.constructeur.isValid && this.state.typeMesure.isValid && this.state.uniteMesure.isValid && this.state.reseau.isValid) {
      axios.post('/capteurs', data)
      .then(response => {
        response.status === 200 ? this.setState({addBdd: true, errorBdd: false}) : this.setState({addBdd: false, errorBdd: true})
      })
      .then(this.setState({addBdd: false, errorBdd: false}))
      .catch(err => console.log(err))

      document.getElementById("addCapteurForm").reset()
      this.setState({ validForm: true })
    } else {
      this.setState({ validForm: false })
    }
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
                  <Form onSubmit={this.onFormSubmit.bind(this)} id='addCapteurForm'>
                    <Form.Group controlId="nomCapteur">
                      <Form.Label>Nom du capteur</Form.Label>
                      <Form.Control type="text" placeholder="Mon capteur 1" name='nomCapteur' onChange={this.onValueChanged.bind(this)} />
                      {this.state.validForm === false && this.state.nomCapteur.isValid === false ? <Form.Text className="text-muted"> {this.state.nomCapteur.msg} </Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="refModele">
                      <Form.Label>Référence du modèle</Form.Label>
                      <Form.Control type="text" placeholder="Référence du capteur" name='refModele' onChange={this.onValueChanged.bind(this)} />
                      {this.state.validForm === false && this.state.refModele.isValid === false ? <Form.Text className="text-muted"> {this.state.refModele.msg} </Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="constructeur">
                      <Form.Label>Constructeur</Form.Label>
                      <Form.Control type="text" placeholder="Constructeur du capteur" name='constructeur' onChange={this.onValueChanged.bind(this)} />
                      {this.state.validForm === false && this.state.constructeur.isValid === false ? <Form.Text className="text-muted"> {this.state.constructeur.msg} </Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="typeMesure">
                      <Form.Label>Type de mesure</Form.Label>
                      <Form.Control as="select" name='typeMesure' onChange={this.onValueChanged.bind(this)}>
                        <option>Pluviométrie</option>
                        <option>Vitesse</option>
                        <option>Température</option>
                        <option>Position GPS</option>
                        <option>Volume</option>
                        <option>Poids</option>
                      </Form.Control>
                      {this.state.validForm === false && this.state.typeMesure.isValid === false ? <Form.Text className="text-muted"> {this.state.typeMesure.msg} </Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="uniteMesure">
                      <Form.Label>Unité de mesure</Form.Label>
                      <Form.Control as="select" name='uniteMesure' onChange={this.onValueChanged.bind(this)}>
                        <option>mm</option>
                        <option>km/h</option>
                        <option>°C</option>
                        <option>Coordonnées GPS</option>
                        <option>m3</option>
                        <option>Kg</option>
                      </Form.Control>
                      {this.state.validForm === false && this.state.uniteMesure.isValid === false ? <Form.Text className="text-muted"> {this.state.uniteMesure.msg} </Form.Text> : null}
                    </Form.Group>

                    <Form.Group controlId="reseau">
                      <Form.Label>Réseau utilisé</Form.Label>
                      <Form.Control type="text" placeholder="Sigfox, ..." name='reseau' onChange={this.onValueChanged.bind(this)} />
                      {this.state.validForm === false && this.state.reseau.isValid === false ? <Form.Text className="text-muted"> {this.state.reseau.msg} </Form.Text> : null}
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
                  {
                    this.state.addBdd && <div>Votre capteur à bien été enregistré</div>
                  }
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
