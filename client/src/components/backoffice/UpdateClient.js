import React, { Component } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import axios from 'axios'

class UpdateClient extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addParc: false,
      parcName: false
    }
  }

  inputName(e) {
    this.setState({ [e.target.name]: false })
  }

  modifyClient(clientID) {
    let data = {
      nom: document.getElementById('clientName').value,
      description: document.getElementById('clientDesc').value
    }
    axios.put('/clients/' + clientID, data)
    .then(this.props.handler)
    .catch(err => console.log(err))
  }

  addParc(clientID, e) {
    e.preventDefault()
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
    axios.post('/parcs', data)
    .then(document.getElementById("ajout-parc-form").reset())
    .catch(err => console.log(err))
  }

  render() {
    return (
      <section id='modifier-client'>
        <Container>
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Modifier un client</Card.Title>
                </Card.Header>
                <Card.Body>
                  {this.props.data.map((client, i) => {
                    return (
                      <Form key={i} onSubmit={this.modifyClient.bind(this, client._id)}>
                        <Form.Group controlId="clientName">
                          <Form.Control type="text" defaultValue={client.nom} />
                        </Form.Group>

                        <Form.Group controlId="clientDesc">
                          <Form.Control as="textarea" rows="3" defaultValue={client.description} />
                        </Form.Group>

                        <Button onClick={this.props.handler}>Retour</Button>
                        <Button type="submit">Modifier votre client</Button>
                        {!this.state.addParc && <Button onClick={() => this.setState({addParc:true})}>Ajouter un parc</Button>}
                      </Form>
                    )
                  })}
                  {this.state.addParc && this.props.data.map((client, i) => {
                    return (
                      <Form key={i} onSubmit={this.addParc.bind(this, client._id)} id='ajout-parc-form'>
                        <Form.Group controlId="parcName">
                          <Form.Control type="text" placeholder="Nom du parc" onChange={this.inputName.bind(this)} />
                          {this.state.parcName && <Form.Text className="error">Vous devez entrer un nom pour votre parc</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="parcDesc">
                          <Form.Control as="textarea" rows="3" placeholder="Description du parc" />
                        </Form.Group>

                        <Button type="submit">Ajouter votre parc</Button>
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

export default UpdateClient
