import React, { Component } from 'react'
import { Container, Row, Col, Table, Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'

import UpdateClient from './UpdateClient'

class GererClient extends Component {
  constructor(props) {
    super(props)

    this.state = {
      clients: [],
      updateClient: [],
      deleteClient: '',
      clientNom: '',
      parcs: [],
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

  handleShow(clientID, clientNom) {
    this.setState({ show: true, deleteClient: clientID, clientNom: clientNom });
  }

  // CRUD Operations
  // --------->> Gestion des Clients <<---------
  getClients = async () => {
    const response = await axios.get('/clients')
    const body = await response.data
    const data = [...body]

    data.sort((a,b) => {
      let comparaison = 0
      let nomA = a.nom
      let nomB = b.nom

      if(nomA.toLowerCase() > nomB.toLowerCase()) {
        comparaison = 1
      } else {
        comparaison = -1
      }

      return comparaison
    })

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return data
  }

  updateClient = async (clientID) => {
    const getClient = await axios.get('/clients/' + clientID)
    const response = await getClient.data

    this.setState({ updateClient: response, update: true })
    return response
  }

  deleteClient = async () => {
    const deleteClient = await axios.delete('/clients/' + this.state.deleteClient)
    const response = await deleteClient.data

    if(response.ok === 1) {
      const getClients = await axios.get('/clients')
      const response = getClients.data

      this.setState({ clients: response, show: false })

      return response
    }

    return response
  }

  // --------->> Appel BDD des Parcs <<---------
  getParcs = async () => {
    const response = await axios.get('/parcs')
    const body = await response.data

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  // --------->> Appel BDD des Capteurs <<---------
  getCapteurs = async () => {
    const response = await axios.get('/capteurs')
    const body = await response.data

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  render() {
    const displayClients = this.state.clients.length > 0 && this.state.clients.map((client, i) => {
      let parcs = 0
      this.state.parcs.map(parc => {
        if(parc.clientID === client._id) {
          parcs += 1
        }
        return parcs
      })

      let capteurs = 0
      this.state.capteurs.map(capteur => {
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
                ? <UpdateClient data={this.state.updateClient} handler={this.finishedUpdate.bind(this)} />
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

export default GererClient
