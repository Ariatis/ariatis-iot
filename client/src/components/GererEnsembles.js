import React, { Component } from 'react'
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'
// import axios from 'axios'

class GererEnsembles extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      group: [],
      index: 2
    }
  }

  // componentDidMount() {
  //   this.callCapteurs()
  //     .then(res => this.setState({ data: res }))
  //     .catch(err => console.log(err))
  // }
  //
  // callCapteurs = async () => {
  //   const response = await axios.get('/capteurs')
  //   const body = await response.data
  //
  //   if (response.status !== 200) {
  //     throw Error(body.message)
  //   }
  //   return body
  // }

  addGroup = () => {
    // const group = (
    //
    // )
    //
    // return group
  }

  render() {
    return (
      <section id="gerer_ensembles">
        <Container>
          <Form onSubmit={this.addGroup.bind(this)}>
            <Form.Row>
              <Col>
                <Form.Control type="text" placeholder="Nom de l'ensemble" />
              </Col>
              <Col>
                <Button>Ajouter un ensemble</Button>
              </Col>
            </Form.Row>
          </Form>
          <Row>
            <Col xs={12}>
              {
                this.state.group.map((group, i) => {
                  return (
                    <Card key={i}>
                      <Card.Header>
                        <Card.Title>
                          {group.nom}
                        </Card.Title>
                      </Card.Header>
                      <Card.Body>

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
