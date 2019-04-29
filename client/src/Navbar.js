import React, { Component }  from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import ariatisLogo from './img/ariatis_logo_full.png'

export default class Navbars extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><img src={ariatisLogo} alt='Logo Ariatis' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to={"/mescapteurs"}>
              <Nav.Link eventKey={0}>Mes capteurs</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/mesensembles"}>
              <Nav.Link eventKey={1}>Mes ensembles</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/ajoutcapteurs"}>
              <Nav.Link eventKey={2}>Ajouter des capteurs</Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/gestionensembles"}>
              <Nav.Link eventKey={3}>Gérer mes ensembles</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
