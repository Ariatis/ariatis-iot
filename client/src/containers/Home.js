import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class Home extends Component {
  render() {
    return (
      <section id="home">
        <Container>
          <Row>
            <Col xs={12}>
              <h2>Bienvenue dans votre outil de gestion et de dashboarding</h2>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Home
