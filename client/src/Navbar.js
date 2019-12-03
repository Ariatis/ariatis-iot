import React, { Component }  from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import ariatisLogo from './img/ariatis_logo_full.png'

export default class Navbars extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand><LinkContainer to={"/"}><img src={ariatisLogo} alt='Logo Ariatis' /></LinkContainer></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Espace de création" id="basic-nav-dropdown">
              <LinkContainer to={"/creationclient"}>
                <Nav.Link eventKey={4}>Nouveau client</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/creationparc"}>
                <Nav.Link eventKey={5}>Nouveau parc</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/creationcapteur"}>
                <Nav.Link eventKey={6}>Nouveau capteur</Nav.Link>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title="Espace de gestion" id="basic-nav-dropdown">
              <LinkContainer to={"/gererclient"}>
                <Nav.Link eventKey={1}>des clients</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/gererparc"}>
                <Nav.Link eventKey={2}>des parcs</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/gerercapteur"}>
                <Nav.Link eventKey={3}>des capteurs</Nav.Link>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
