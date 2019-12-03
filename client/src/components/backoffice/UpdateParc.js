import React, { Component } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getOneParc, updateParc } from '../../actions/ParcAction'

class UpdateParc extends Component {
  constructor(props) {
    super(props)

    this.props.getOneParc(this.props.parcID)
  }

  modifyParc(parcID) {
    let data = {
      nom: document.getElementById('parcName').value,
      description: document.getElementById('parcDesc').value
    }

    this.props.updateParc(parcID, data)
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
                  {this.props.oneParc.length > 0 && this.props.oneParc.map((parc, i) => {
                    return (
                      <Form key={i}>
                        <Form.Group controlId="parcName">
                          <Form.Control type="text" defaultValue={parc.nom} />
                        </Form.Group>

                        <Form.Group controlId="parcDesc">
                          <Form.Control as="textarea" rows="3" defaultValue={parc.description} />
                        </Form.Group>

                        <Button onClick={this.props.handler}>Retour</Button>
                        <Button onClick={this.modifyParc.bind(this, parc._id)}>Modifier votre parc</Button>
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
    oneParc: state.parcs.oneParc
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOneParc, updateParc
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateParc)
