import React, { Component } from 'react'
import Content from './Content'
import Navbar from './Navbar'

class App extends Component {
  render() {
    return (
      <section>
        <Navbar />
        <Content />
      </section>
    )
  }
}

export default App;
