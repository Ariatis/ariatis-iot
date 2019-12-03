import React, { Component } from 'react'
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getCapteurs, deleteCapteur, clearOneCapteur } from '../../actions/CapteurAction'
import { getClients } from '../../actions/ClientAction'
import { getParcs } from '../../actions/ParcAction'

import UpdateCapteur from './UpdateCapteur'

class GererCapteur extends Component {
  constructor(props) {
    super(props)

    this.props.getCapteurs()
    this.props.getClients()
    this.props.getParcs()

    this.state = {
      deleteCapteur: '',
      updateCapteur: '',
      capteurNom: '',
      clientNom: '',
      parcNom: '',
      update: false,
      show: false
    }
  }

  finishedUpdate() {
    this.props.clearOneCapteur()
    this.setState({ updateCapteur: '', update: !this.state.update })
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow(capteurID, capteurNom, clientNom, parcNom) {
    this.setState({ show: true, deleteCapteur: capteurID, capteurNom: capteurNom, clientNom: clientNom, parcNom: parcNom })
  }

  updateCapteur(capteurID) {
    this.setState({ updateCapteur: capteurID, update: !this.state.update })
  }

  deleteCapteur() {
    this.props.deleteCapteur(this.state.deleteCapteur)
    this.setState({ show: false })
  }

  render() {
    const displayCapteurs = this.props.capteurs.length > 0 && this.props.capteurs.map(capteur => {
      const clientName = this.props.clients.map(client => {
        if(client._id === capteur.clientID) return client.nom
        return true
      })

      const parcName = this.props.parcs.map(parc => {
        if(parc._id === capteur.parcID) return parc.nom
        return true
      })

      return (
        <tr key={capteur._id} id={capteur._id}>
          <td>{capteur.nom}</td>
          <td>{capteur.refModele}</td>
          <td>{capteur.constructeur}</td>
          <td>{capteur.typeMesure}</td>
          <td>{capteur.uniteMesure}</td>
          <td>{capteur.reseau}</td>
          <td>x: {capteur.latitude} y: {capteur.longitude}</td>
          <td>{clientName}</td>
          <td>{parcName}</td>
          <td>
            <FontAwesomeIcon icon="pencil-alt" onClick={this.updateCapteur.bind(this, capteur._id)} />
            <FontAwesomeIcon icon="times" onClick={this.handleShow.bind(this, capteur._id, capteur.nom, clientName, parcName)} />
          </td>
        </tr>
      )
    })

    return (
      <section id='gerer-capteur'>
        <Container>
          <Row>
            <Col xs={12}>
              {this.state.update
                ? <UpdateCapteur capteurID={this.state.updateCapteur} handler={this.finishedUpdate.bind(this)} />
                : <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Capteur</th>
                      <th>Référence</th>
                      <th>Constructeur</th>
                      <th>Type de mesure</th>
                      <th>Unité de mesure</th>
                      <th>Réseau</th>
                      <th>Coordonnées</th>
                      <th>Clients</th>
                      <th>Parcs</th>
                      <th>Gestion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayCapteurs}
                  </tbody>
                </Table>
              }
            </Col>
            <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Suppression du capteur: {this.state.capteurNom}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Etes vous certain de vouloir supprimer {this.state.capteurNom} ?</p>
                <p>Client : {this.state.clientNom}</p>
                <p>Parcs : {this.state.parcNom}</p>
                <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                  Annuler
                </Button>
                <Button variant="danger" onClick={this.deleteCapteur.bind(this)}>
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
    capteurs: state.capteurs.capteurs,
    clients: state.clients.clients,
    parcs: state.parcs.parcs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCapteurs, deleteCapteur, clearOneCapteur,
    getClients,
    getParcs
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GererCapteur)
