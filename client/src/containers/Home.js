import React, { Component } from 'react'
import { Container, Row, Col, Card, CardDeck } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

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
          <Row id="creation">
            <Col xs={12} className="home-section-title">
              <h3>Espace de création</h3>
            </Col>
            <CardDeck>
              <Col xs={12} sm={6} md={4}>
                <Card>
                  <Card.Header>Créer un client</Card.Header>
                  <Card.Body>
                    <Card.Text>Cette interface vous permet de créer un client puis ensuite les parcs et capteurs.</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <LinkContainer to={"/creationclient"}>
                      <Card.Link href="#"><small>Créer un client</small></Card.Link>
                    </LinkContainer>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Card>
                  <Card.Header>Créer un parc</Card.Header>
                  <Card.Body>
                    <Card.Text>Cette interface vous permet de créer un parc en l'associant à un client puis ses capteurs.</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <LinkContainer to={"/"}>
                      <Card.Link href="#"><small>Créer un parc (feature en cours)</small></Card.Link>
                    </LinkContainer>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Card>
                  <Card.Header>Créer vos capteurs</Card.Header>
                  <Card.Body>
                    <Card.Text>Cette interface vous permet de créer vos capteurs en les associant à un client et un parc.</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <LinkContainer to={"/"}>
                      <Card.Link href="#"><small>Créer les capteurs (feature en cours)</small></Card.Link>
                    </LinkContainer>
                  </Card.Footer>
                </Card>
              </Col>
            </CardDeck>
          </Row>
          <Row id="gestion">
            <Col xs={12} className="home-section-title">
              <h3>Espace de gestion</h3>
            </Col>
            <CardDeck>
              <Col xs={12} sm={6} md={4}>
                <Card>
                  <Card.Header>Gérer vos clients</Card.Header>
                  <Card.Body>
                    <Card.Text>Cette interface vous permet de gérer vos clients ainsi que les parcs et capteurs qui leur sont associés.</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <LinkContainer to={"/gererclient"}>
                      <Card.Link href="#"><small>Gestion des clients</small></Card.Link>
                    </LinkContainer>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Card>
                  <Card.Header>Gérer vos parcs</Card.Header>
                  <Card.Body>
                    <Card.Text>Cette interface vous permet de gérer l'ensemble de vos parcs par clients ainsi que les capteurs qui leur sont associés.</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <LinkContainer to={"/gererparc"}>
                      <Card.Link href="#"><small>Gestion des parcs</small></Card.Link>
                    </LinkContainer>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Card>
                  <Card.Header>Gérer vos capteurs</Card.Header>
                  <Card.Body>
                    <Card.Text>Cette interface vous permet de gérer l'ensemble de vos capteurs par clients et/ou parcs.</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <LinkContainer to={"/gerercapteur"}>
                      <Card.Link href="#"><small>Gestion des capteurs</small></Card.Link>
                    </LinkContainer>
                  </Card.Footer>
                </Card>
              </Col>
            </CardDeck>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Home
