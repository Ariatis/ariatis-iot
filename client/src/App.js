import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPencilAlt, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'

import Content from './Content'
import Navbar from './Navbar'

library.add(faPencilAlt, faTimes, faPlus)

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
