import React, { Component }  from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class Navbars extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>NHL vote app</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <LinkContainer to={"/mescapteurs"}>
            <Nav.Link eventKey={0}>Mes capteurs</Nav.Link>
          </LinkContainer>
            <LinkContainer to={"/mesensembles"}>
              <Nav.Link eventKey={1}>Mes ensembles</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to={"/monCompte"}>
              <Nav.Link eventKey={2}>Mon Compte</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
