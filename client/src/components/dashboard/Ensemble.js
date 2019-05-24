import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'

import capteurImg from '../img/capteurs.png'

class Capteur extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.callGroups()
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err))
  }

  callGroups = async () => {
    const response = await axios.get('/ensembles')
    const body = await response.data

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  render() {
    const mesEnsembles = (this.state.data !== null && this.state.data.map((group, i) => {
      return(
        <Col xs={12} md={4} key={i}>
          <Card>
            <Card.Header>
              <Card.Title>
                {group.nom}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              {
                group.capteurs !== undefined && group.capteurs.map((capteur, i) => {
                  return(
                    <Col xs={12} key={i} id={capteur.capteurID}>
                      <img src={capteurImg} alt={capteur.capteurNom} />
                      {capteur.capteurNom}
                    </Col>
                  )
                })
              }
            </Card.Body>
          </Card>
        </Col>
      )
    }))
    return (
      <section id="ensembles">
        <Container>
          <Row>
            {mesEnsembles}
          </Row>
        </Container>
      </section>
    )
  }
}

export default Capteur
