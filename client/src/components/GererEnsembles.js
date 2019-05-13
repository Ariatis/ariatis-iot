import React, { Component } from 'react'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'
import axios from 'axios'

import capteurImg from '../img/capteurs.png'

class GererEnsembles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      capteurs: null,
      group: [],
      addEnsembleErr: false
    }
  }

  componentDidMount() {
    this.callCapteurs()
      .then(res => this.setState({ capteurs: res }))
      .catch(err => console.log(err))

    this.callEnsembles()
      .then(res => this.setState({ group: res }))
      .catch(err => console.log(err))
  }

  nameEnsemble() {
    this.setState({addEnsembleErr: false})
  }

  // Dragging + State management
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

  onDropAdd = (e, groupName) => {
    let capteurID = e.dataTransfer.getData("id")
    let capteurNom =  e.dataTransfer.getData("nom")

    let groups = this.state.group.filter(group => {
      if (group.nom === groupName) {
        if (group.capteurs === undefined) {
          group.capteurs = [{capteurID: capteurID, capteurNom: capteurNom}]
          this.updateGroup(group.nom, group.capteurs)
        } else {
          let newCapteur = [...group.capteurs]
          newCapteur.push({capteurID: capteurID, capteurNom: capteurNom})
          group.capteurs = newCapteur
          this.updateGroup(group.nom, group.capteurs)
        }
      }
      return groups
    })

    this.setState({
      ...this.state
    })
  }

  onDragStartRemove = (e, id, nom, groupNom) => {
    e.dataTransfer.setData('id', id)
    e.dataTransfer.setData('nom', nom)
    e.dataTransfer.setData('groupNom', groupNom)
  }

  onDropRemove = (e) => {
    let capteurID = e.dataTransfer.getData("id")
    let groupNom =  e.dataTransfer.getData("groupNom")

    let groups = this.state.group.filter(group => {
      if(group.nom === groupNom) {
        let removeCapteur = [...group.capteurs]

        removeCapteur.map((capteur, i) => {
          if(capteur.capteurID === capteurID) {
            removeCapteur.splice(i, 1)
            group.capteurs = removeCapteur
            this.updateGroup(group.nom, group.capteurs)
          }
          return groups
        })
      }
      return groups
    })

    this.setState({
      ...this.state
    })
  }

  // CRUD Operations
  callCapteurs = async () => {
    const response = await axios.get('/capteurs')
    const body = await response.data

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  callEnsembles = async () => {
    const response = await axios.get('/ensembles')
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

    nomEnsemble !== '' ? newArray.push({nom:nomEnsemble}) : this.setState({addEnsembleErr: true})

    this.setState({
      group: newArray
    })

    let data = {
      "nom": nomEnsemble,
      "capteurs": []
    }

    nomEnsemble !== '' && this.postGroup(data)
  }

  removeGroup(groupNom) {
    let groups = [...this.state.group]

    groups.map((group, i) => {
      if(group.nom === groupNom) {
        groups.splice(i, 1)
        group = groups
      }
      return groups
    })

    this.setState({
      group: groups
    })
    this.deleteGroup(groupNom)
  }

  postGroup(data) {
    axios.post('/ensembles', data)
    .catch(err => console.log(err))
  }

  updateGroup(nom, data) {
    axios.put('/ensembles/' + nom, data)
    .catch(err => console.log(err))
  }

  deleteGroup(nom) {
    axios.delete('/ensembles/' + nom)
    .catch(err => console.log(err))
  }

  render() {
    return (
      <section id="gerer_ensembles">
        <Container>
          <Form onSubmit={this.addGroup.bind(this)}>
            <Form.Row>
              <Col>
                <Form.Control id="nomEnsemble" type="text" placeholder="Nom de l'ensemble" onChange={this.nameEnsemble.bind(this)} />
                {this.state.addEnsembleErr && <Form.Text className="error">Vous devez entrer un nom pour votre ensemble</Form.Text>}
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
                <Card.Body onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDropRemove(e)}>
                    {
                      this.state.capteurs !== null && this.state.capteurs.map(capteur => {
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
                      <Card.Body onDragOver={(e)=>this.onDragOver(e)} onDrop={(e)=>this.onDropAdd(e, group.nom)}>
                        {
                          group.capteurs !== undefined && group.capteurs.map((capteur, i) => {
                            return(
                              <Col xs={12} md={6} key={i} draggable id={capteur.capteurID} onDragStart={(e) => this.onDragStartRemove(e, capteur.capteurID, capteur.capteurNom, group.nom)} onMouseDown={this.dragging.bind(this, capteur.capteurID)} onMouseUp={this.draggable.bind(this, capteur.capteurID)}>
                                <img src={capteurImg} alt={capteur.capteurNom} />
                                {capteur.capteurNom}
                              </Col>
                            )
                          })
                        }
                      </Card.Body>
                      <Card.Footer className="text-muted" onClick={this.removeGroup.bind(this, group.nom)}>Supprimer l'ensemble</Card.Footer>
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
