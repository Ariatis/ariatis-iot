import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AjoutCapteur from "./components/AjoutCapteur"

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AjoutCapteur}/>
    </Switch>
  </main>
)

export default Main
