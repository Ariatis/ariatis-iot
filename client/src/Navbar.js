import React, { Component }  from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
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
            <NavDropdown title="Gérer les clients" id="basic-nav-dropdown">
              <NavDropdown.Item href={"/gererclient"}>Les clients</NavDropdown.Item>
              <NavDropdown.Item href={"/gererparc"}>Les parcs</NavDropdown.Item>
              <NavDropdown.Item href={"/gerercapteur"}>Les capteurs</NavDropdown.Item>
            </NavDropdown>
            <LinkContainer to={"/creationclient"}>
              <Nav.Link eventKey={3}>Créer un client</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
