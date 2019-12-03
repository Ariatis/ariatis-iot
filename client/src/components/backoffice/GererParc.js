import React, { Component } from 'react'
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getClients } from '../../actions/ClientAction'
import { getParcs, deleteParc, clearOneParc } from '../../actions/ParcAction'
import { getCapteurs } from '../../actions/CapteurAction'

import UpdateParc from './UpdateParc'

class GererParc extends Component {
  constructor(props) {
    super(props)

    this.props.getClients()
    this.props.getParcs()
    this.props.getCapteurs()

    this.state = {
      updateParc: '',
      deleteParc: '',
      parcNom: '',
      update: false,
      show: false
    }
  }

  finishedUpdate() {
    this.props.clearOneParc()
    this.setState({ update: !this.state.update })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(parcID, parcNom) {
    this.setState({ show: true, deleteParc: parcID, parcNom: parcNom });
  }

  updateParc(parcID) {
    this.setState({ updateParc: parcID, update: !this.state.update })
  }

  deleteParc() {
    this.props.deleteParc(this.state.deleteParc)
    this.setState({ show: false })
  }

  render() {
    const displayParcs = this.props.parcs.length > 0 && this.props.parcs.map(parc => {
      let capteurs = 0

      this.props.capteurs.map(capteur => {
        if(capteur.parcID === parc._id) capteurs += 1
        return capteurs
      })

      const clientName = this.props.clients.map(client => {
        if(client._id === parc.clientID) return client.nom
        return true
      })

      return (
        <tr key={parc._id} id={parc._id}>
          <td>{parc.nom}</td>
          <td>{parc.description}</td>
          <td>{clientName}</td>
          <td>{capteurs}</td>
          <td>
          <FontAwesomeIcon icon="pencil-alt" onClick={this.updateParc.bind(this, parc._id)} />
          <FontAwesomeIcon icon="times" onClick={this.handleShow.bind(this, parc._id, parc.nom)} />
          </td>
        </tr>
      )
    })

    return (
      <section id='gerer-parc'>
        <Container>
          <Row>
            <Col xs={12}>
              {this.state.update
                ? <UpdateParc parcID={this.state.updateParc} handler={this.finishedUpdate.bind(this)} />
                : <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Parcs</th>
                      <th>Description</th>
                      <th>Clients</th>
                      <th>Capteurs</th>
                      <th>Gestion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayParcs}
                  </tbody>
                </Table>
              }
            </Col>
            <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Suppression de votre parc: {this.state.parcNom}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Etes vous certain de vouloir supprimer {this.state.parcNom} ?</p>
                <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                  Annuler
                </Button>
                <Button variant="danger" onClick={this.deleteParc.bind(this)}>
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
    getClients,
    getParcs, deleteParc, clearOneParc,
    getCapteurs
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GererParc)
