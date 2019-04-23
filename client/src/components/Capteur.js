import React, { Component } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios'

class Capteur extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.callCapteurs()
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err))
  }

  callCapteurs = async () => {
    const response = await axios.get('/capteurs')
    const body = await response.data

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  render() {
    const mesCapteurs = (this.state.data !== null && this.state.data.map((capteur, i) => {
      return(
        <tr key={i}>
          <td>{capteur.nom}</td>
          <td>{capteur.refModele}</td>
          <td>{capteur.constructeur}</td>
          <td>{capteur.typeMesure}</td>
          <td>{capteur.uniteMesure}</td>
          <td>{capteur.reseau}</td>
          <td>x:{capteur.latitude} y:{capteur.longitude}</td>
        </tr>
      )
    }))
    return (
      <section id="capteurs">
        <Container>
          <Row>
            <Col xs={12}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Référence</th>
                    <th>Constructeur</th>
                    <th>Type de mesure</th>
                    <th>Unité de mesure</th>
                    <th>Réseau</th>
                    <th>Coordonnées GPS</th>
                  </tr>
                </thead>
                <tbody>
                  {mesCapteurs}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default Capteur
