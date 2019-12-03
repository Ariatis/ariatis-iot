import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import AddCapteur from '../components/backoffice/AddCapteur'

class CreationCapteur extends Component {
  render() {
    return (
      <section id="creation">
        <Container>
          <Row>
            <Col xs={12}>
              <AddCapteur/>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default CreationCapteur
