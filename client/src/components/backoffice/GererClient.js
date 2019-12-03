import React, { Component } from 'react'
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getClients, deleteClient, clearOneClient } from '../../actions/ClientAction'
import { getParcs } from '../../actions/ParcAction'
import { getCapteurs } from '../../actions/CapteurAction'

import UpdateClient from './UpdateClient'

class GererClient extends Component {
  constructor(props) {
    super(props)

    this.props.getClients()
    this.props.getParcs()
    this.props.getCapteurs()

    this.state = {
      updateClient: '',
      deleteClient: '',
      clientNom: '',
      update: false,
      show: false
    }
  }

  finishedUpdate() {
    this.props.clearOneClient()
    this.setState({ update: !this.state.update })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(clientID, clientNom) {
    this.setState({ show: true, deleteClient: clientID, clientNom: clientNom });
  }

  deleteClient() {
    this.props.deleteClient(this.state.deleteClient)
    this.setState({ show: false })
  }

  updateClient(clientID) {
    this.setState({ updateClient: clientID, update: !this.state.update })
  }

  render() {
    const displayClients = this.props.clients.length > 0 && this.props.clients.map((client, i) => {
      let parcs = 0
      this.props.parcs.map(parc => {
        if(parc.clientID === client._id) {
          parcs += 1
        }
        return parcs
      })

      let capteurs = 0
      this.props.capteurs.map(capteur => {
        if(capteur.clientID === client._id) {
          capteurs += 1
        }
        return capteurs
      })

      return (
        <tr key={client._id} id={client._id}>
          <td>{client.nom}</td>
          <td>{client.description}</td>
          <td>{parcs}</td>
          <td>{capteurs}</td>
          <td>
            <FontAwesomeIcon icon="pencil-alt" onClick={this.updateClient.bind(this, client._id)} />
            <FontAwesomeIcon icon="times" onClick={this.handleShow.bind(this, client._id, client.nom)} />
          </td>
        </tr>
      )
    })

    return (
      <section id='gerer-client'>
        <Container>
          <Row>
            <Col xs={12}>
              {this.state.update
                ? <UpdateClient clientID={this.state.updateClient} handler={this.finishedUpdate.bind(this)} />
                : <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Clients</th>
                    <th>Description</th>
                    <th>Parcs</th>
                    <th>Capteurs</th>
                    <th>Gestion</th>
                  </tr>
                </thead>
                <tbody>
                  {displayClients}
                </tbody>
              </Table>
            }
            </Col>
            <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Suppression de votre client {this.state.clientNom}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Etes-vous certain de vouloir supprimer  {this.state.clientNom} ?</p>
                <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                  Annuler
                </Button>
                <Button variant="danger" onClick={this.deleteClient.bind(this)}>
                  Supprimer
                </Button>
              </Modal.Body>
            </Modal>
          </Row>
        </Container>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    clients: state.clients.clients,
    capteurs: state.capteurs.capteurs,
    parcs: state.parcs.parcs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getClients, deleteClient, clearOneClient,
    getParcs,
    getCapteurs
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GererClient)
