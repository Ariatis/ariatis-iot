import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Ajout from '../components/backoffice/Ajout'

class Home extends Component {
  render() {
    return (
      <section id="creation">
        <Container>
          <Row>
            <Col xs={12}>
              <Ajout />
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Home
