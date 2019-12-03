import React, { Component } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { updateClient, getOneClient } from '../../actions/ClientAction'

class UpdateClient extends Component {
  constructor(props) {
    super(props)

    this.props.getOneClient(this.props.clientID)
  }

  modifyClient(clientID) {
    let data = {
      nom: document.getElementById('clientName').value,
      description: document.getElementById('clientDesc').value
    }
    this.props.updateClient(clientID, data)
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
                  <Card.Title>Modifier un client</Card.Title>
                </Card.Header>
                <Card.Body>
                  {this.props.oneClient.length > 0 && this.props.oneClient.map((client, i) => {
                    return (
                      <Form key={i}>
                        <Form.Group controlId="clientName">
                          <Form.Control type="text" defaultValue={client.nom} />
                        </Form.Group>

                        <Form.Group controlId="clientDesc">
                          <Form.Control as="textarea" rows="3" defaultValue={client.description} />
                        </Form.Group>

                        <Button onClick={this.props.handler}>Retour</Button>
                        <Button onClick={this.modifyClient.bind(this, client._id)}>Modifier votre client</Button>
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
    oneClient: state.clients.oneClient
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOneClient, updateClient
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateClient)
