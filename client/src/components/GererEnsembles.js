import React, { Component } from 'react'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'
import axios from 'axios'

import capteurImg from '../img/capteurs.png'

class GererEnsembles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      group: [],
      index: 2
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

  addGroup(e) {
    e.preventDefault()
    let newArray = [...this.state.group]
    let nomEnsemble = document.getElementById('nomEnsemble').value

    newArray.push({nom:nomEnsemble})

    this.setState({
      group: newArray
    })
  }

  dragging(id) {
    let element = document.getElementById(id)
    element.style.cursor = 'grabbing'
  }

  draggable(id) {
    let element = document.getElementById(id)
    element.style.cursor = 'grab'
  }

  onDragStart = (e, id, nom) => {
    e.dataTransfer.setData('id', id)
    e.dataTransfer.setData('nom', nom)
  }

  onDragOver = (e) => {
    e.preventDefault()
  }

  onDrop = (e, groupName) => {
    let capteurID = e.dataTransfer.getData("id")
    let capteurNom =  e.dataTransfer.getData("nom")

    let groups = this.state.group.filter(group => {
      if (group.nom === groupName) {
        if (group.capteurs === undefined) {
          group.capteurs = [{capteurID: capteurID, capteurNom: capteurNom}]
        } else {
          let newCapteur = [...group.capteurs]
          newCapteur.push({capteurID: capteurID, capteurNom: capteurNom})
          group.capteurs = newCapteur
        }
      }
      return groups
    })

    this.setState({
      ...this.state
    })
  }

  render() {
    return (
      <section id="gerer_ensembles">
        <Container>
          <Form onSubmit={this.addGroup.bind(this)}>
            <Form.Row>
              <Col>
                <Form.Control id="nomEnsemble" type="text" placeholder="Nom de l'ensemble" />
              </Col>
              <Col>
                <Button type="submit">Ajouter un ensemble</Button>
              </Col>
            </Form.Row>
          </Form>
          <Row>
            <Col xs={12} md={6}>
              <Card>
                <Card.Header>
                  <Card.Title>
                    Mes capteurs
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                    {
                      this.state.data !== null && this.state.data.map(capteur => {
                        return(
                          <Col xs={12} md={6} draggable key={capteur._id} id={capteur._id} onDragStart={(e) => this.onDragStart(e, capteur._id, capteur.nom)} onMouseDown={this.dragging.bind(this, capteur._id)} onMouseUp={this.draggable.bind(this, capteur._id)}>
                            <img src={capteurImg} alt={capteur.nom} />
                            {capteur.nom}
                          </Col>
                        )
                      })
                    }
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              {
                this.state.group.map((group, i) => {
                  return (
                    <Card key={i}>
                      <Card.Header>
                        <Card.Title>
                          {group.nom}
                        </Card.Title>
                      </Card.Header>
                      <Card.Body onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDrop(e, group.nom)}>
                        {
                          group.capteurs !== undefined && group.capteurs.map((capteur, i) => {
                            return(
                              <Col xs={12} md={6} key={i}>
                                <img src={capteurImg} alt={capteur.capteurNom} />
                                {capteur.capteurNom}
                              </Col>
                            )
                          })
                        }
                      </Card.Body>
                    </Card>
                  )
                })
              }
            </Col>
          </Row>
        </Container>
      </section>
    )
  }
}

export default GererEnsembles
