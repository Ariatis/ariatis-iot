import React, { Component } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import axios from 'axios'

class UpdateParc extends Component {
  modifyParc(parcID) {
    let data = {
      nom: document.getElementById('parcName').value,
      description: document.getElementById('parcDesc').value
    }
    axios.put('/parcs/' + parcID, data)
    .then(this.props.handler)
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
                  <Card.Title>Modifier un parc</Card.Title>
                </Card.Header>
                <Card.Body>
                  {this.props.data.map((parc, i) => {
                    return (
                      <Form key={i} onSubmit={this.modifyParc.bind(this, parc._id)}>
                        <Form.Group controlId="parcName">
                          <Form.Control type="text" defaultValue={parc.nom} />
                        </Form.Group>

                        <Form.Group controlId="parcDesc">
                          <Form.Control as="textarea" rows="3" defaultValue={parc.description} />
                        </Form.Group>

                        <Button onClick={this.props.handler}>Retour</Button>
                        <Button type="submit">Modifier votre parc</Button>
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

export default UpdateParc
