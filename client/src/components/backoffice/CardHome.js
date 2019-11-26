import React from 'react'
import { Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CardHome = (props) => {
  return (
    <Card>
      <Card.Header>{props.title}</Card.Header>
      <Card.Body>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <LinkContainer to={props.url}>
          <Card.Link href="#"><small>{props.link}</small></Card.Link>
        </LinkContainer>
      </Card.Footer>
    </Card>
  )
}

export default CardHome
