import React, { Component } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { updateCapteur, getOneCapteur } from '../../actions/CapteurAction'

class UpdateCapteur extends Component {
  constructor(props) {
    super(props)

    this.props.getOneCapteur(this.props.capteurID)
  }

  modifyCapteur(capteurID) {
    let data = {
      nom: document.getElementById('nomCapteur').value,
      refModele: document.getElementById('refModele').value,
      constructeur: document.getElementById('constructeur').value,
      typeMesure: document.getElementById('typeMesure').value,
      uniteMesure: document.getElementById('uniteMesure').value,
      reseau: document.getElementById('reseau').value,
      latitude: document.getElementById('latitude').value,
      longitude: document.getElementById('longitude').value,
    }

    this.props.updateCapteur(capteurID, data)
    this.props.handler()
  }

  render() {
    return (
      <section id='modifier-client'>
        <Container>
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Modifier un parc</Card.Title>
                </Card.Header>
                <Card.Body>
                  {this.props.oneCapteur.length > 0 && this.props.oneCapteur.map((capteur, i) => {
                    return (
                      <Form key={i}>
                        <Form.Group controlId="nomCapteur">
                          <Form.Label>Nom du capteur</Form.Label>
                          <Form.Control type="text" defaultValue={capteur.nom} name='nomCapteur' />
                        </Form.Group>

                        <Form.Group controlId="refModele">
                          <Form.Label>Référence du modèle</Form.Label>
                          <Form.Control type="text" defaultValue={capteur.refModele} name='refModele' />
                        </Form.Group>

                        <Form.Group controlId="constructeur">
                          <Form.Label>Constructeur</Form.Label>
                          <Form.Control type="text" defaultValue={capteur.constructeur} name='constructeur' />
                        </Form.Group>

                        <Form.Group controlId="typeMesure">
                          <Form.Label>Type de mesure</Form.Label>
                          <Form.Control as="select" defaultValue={capteur.typeMesure} name='typeMesure'>
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
                          <Form.Control as="select" defaultValue={capteur.uniteMesure} name='uniteMesure'>
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
                          <Form.Control type="text" defaultValue={capteur.reseau} name='reseau' />
                        </Form.Group>

                        <Form.Group controlId="latitude">
                          <Form.Label>Latitude</Form.Label>
                          <Form.Control type="text" defaultValue={capteur.latitude} />
                        </Form.Group>

                        <Form.Group controlId="longitude">
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control type="text" defaultValue={capteur.longitude} />
                        </Form.Group>

                        <Button onClick={this.props.handler}>Retour</Button>
                        <Button onClick={this.modifyCapteur.bind(this, capteur._id)}>Modifier votre capteur</Button>
                      </Form>
                    )
                  })}
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
    oneCapteur: state.capteurs.oneCapteur
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateCapteur, getOneCapteur
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCapteur)
