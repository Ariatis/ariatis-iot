import React, { Component } from 'react'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getClients } from '../../actions/ClientAction'
import { postParc } from '../../actions/ParcAction'

class AddParc extends Component {
  constructor(props) {
    super(props)

    this.props.getClients()

    this.state = {
      parcName: false
    }
  }

  inputName(e) {
    this.setState({ [e.target.name]: false })
  }

  // CRUD Operations
  // --------->> Gestion des Parcs <<---------
  addParc(e) {
    e.preventDefault()
    let clientID = document.getElementById('client').value
    let parcName = document.getElementById('parcName').value
    let parcDesc = document.getElementById('parcDesc').value

    let data = {
      "clientID": clientID,
      "nom": parcName,
      "description": parcDesc
    }

    parcName !== '' ? this.postParc(data) : this.setState({parcName: true})
  }

  postParc(data) {
    this.props.postParc(data)
    document.getElementById("ajout-parc-form").reset()
  }

  render() {
    return (
      <section>
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <Card>
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

                    <Form.Group controlId="client">
                      <Form.Label>Client</Form.Label>
                      <Form.Control as="select" name='client'>
                        {this.props.clients.map((client, i) => <option key={i} value={client._id}>{client.nom}</option>)}
                      </Form.Control>
                    </Form.Group>

                    <Button type="submit">Ajouter votre parc</Button>
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
    clients: state.clients.clients
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClients,
    postParc
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddParc)
