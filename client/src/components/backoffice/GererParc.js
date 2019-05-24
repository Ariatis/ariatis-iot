import React, { Component } from 'react'
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

import UpdateParc from './UpdateParc'

class GererParc extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clients: [],
      parcs: [],
      updateParc: [],
      deleteParc: '',
      capteurs: [],
      update: false,
      show: false
    }
  }

  componentDidMount() {
    this.getClients()
    .then(res => this.setState({ clients: res }))
    .catch(err => console.log(err))

    this.getParcs()
    .then(res => this.setState({ parcs: res }))
    .catch(err => console.log(err))

    this.getCapteurs()
    .then(res => this.setState({ capteurs: res }))
    .catch(err => console.log(err))
  }

  finishedUpdate() {
    this.setState({ update:false })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(clientID) {
    this.setState({ show: true, deleteClient: clientID });
  }

  // CRUD Operations
  // --------->> Gestion des Clients <<---------
  getClients = async () => {
    const response = await axios.get('/clients')
    const body = await response.data

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  // --------->> Gestion des Parcs <<---------
  getParcs = async () => {
    const response = await axios.get('/parcs')
    const body = await response.data

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  updateParc = async (parcID) => {
    const getParc = await axios.get('/parcs/' + parcID)
    const response = await getParc.data

    this.setState({ updateParc: response, update: true })
    return response
  }

  deleteParc = async () => {
    const deleteParc = await axios.delete('/parcs/' + this.state.deleteParc)
    const response = await deleteParc.data

    if(response.ok === 1) {
      const getClients = await axios.get('/parcs')
      const response = getClients.data

      this.setState({ parcs: response, show: false })

      return response
    }

    return response
  }

  // --------->> Gestion des Capteurs <<---------
  getCapteurs = async () => {
    const response = await axios.get('/capteurs')
    const body = await response.data

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  render() {
    const displayParcs = this.state.parcs.length > 0 && this.state.parcs.map(parc => {
      let capteurs = 0
      this.state.capteurs.map(capteur => {
        if(capteur.parcID === parc._id) capteurs += 1
        return capteurs
      })
      const clientName = this.state.clients.map(client => {
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
          <FontAwesomeIcon icon="times" onClick={this.handleShow.bind(this, parc._id)} />
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
                ? <UpdateParc data={this.state.updateParc} handler={this.finishedUpdate.bind(this)} />
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
                <Modal.Title>Suppression de votre parc</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Etes vous sur de vouloir supprimer ce parc ?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                  Fermer
                </Button>
                <Button variant="danger" onClick={this.deleteParc.bind(this)}>
                  Supprimer
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>
        </Container>
      </section>
    )
  }
}

export default GererParc
