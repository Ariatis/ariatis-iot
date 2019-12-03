import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import AddClient from '../components/backoffice/AddClient'

class CreationClient extends Component {
  render() {
    return (
      <section id="creation">
        <Container>
          <Row>
            <Col xs={12}>
              <AddClient />
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default CreationClient
