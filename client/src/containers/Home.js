import React, { Component } from 'react'
import { Container, Row, Col, CardDeck } from 'react-bootstrap'

import CardHome from '../components/backoffice/CardHome'

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
                <CardHome title={'Créer un client'}
                text={'Cette interface vous permet de créer un client puis ensuite les parcs et capteurs.'}
                url={'/creationclient'}
                link={'Créer un client'} />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <CardHome title={'Créer un parc'}
                text={'Cette interface vous permet de créer un parc en l\'associant à un client puis ses capteurs.'}
                url={'/'}
                link={'Créer un parc (feature en cours)'} />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <CardHome title={'Créer vos capteurs'}
                text={'Cette interface vous permet de créer vos capteurs en les associant à un client et un parc.'}
                url={'/'}
                link={'Créer les capteurs (feature en cours)'} />
              </Col>
            </CardDeck>
          </Row>
          <Row id="gestion">
            <Col xs={12} className="home-section-title">
              <h3>Espace de gestion</h3>
            </Col>
            <CardDeck>
              <Col xs={12} sm={6} md={4}>
                <CardHome title={'Gérer vos clients'}
                text={'Cette interface vous permet de gérer vos clients ainsi que les parcs et capteurs qui leur sont associés.'}
                url={'/gererclient'}
                link={'Gestion des clients'} />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <CardHome title={'Gérer vos parcs'}
                text={'Cette interface vous permet de gérer l\'ensemble de vos parcs par clients ainsi que les capteurs qui leur sont associés.'}
                url={'/gererparc'}
                link={'Gestion des parcs'} />
              </Col>
              <Col xs={12} sm={6} md={4}>
                <CardHome title={'Gérer vos capteurs'}
                text={'Cette interface vous permet de gérer l\'ensemble de vos capteurs par clients et/ou parcs.'}
                url={'/gerercapteur'}
                link={'Gestion des capteurs'} />
              </Col>
            </CardDeck>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Home
