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
            <NavDropdown title="Gestion..." id="basic-nav-dropdown">
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
            <LinkContainer to={"/creationclient"}>
              <Nav.Link eventKey={4}>Créer un client</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
