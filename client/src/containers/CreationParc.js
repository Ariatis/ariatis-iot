import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import AddParc from '../components/backoffice/AddParc'

class CreationParc extends Component {
  render() {
    return (
      <section id="creation">
        <Container>
          <Row>
            <Col xs={12}>
              <AddParc />
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default CreationParc
