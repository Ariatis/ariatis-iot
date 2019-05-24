import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './containers/Home'
import Creation from './containers/Creation'
import GererClient from './components/backoffice/GererClient'
import GererParc from './components/backoffice/GererParc'
import GererCapteur from './components/backoffice/GererCapteur'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/creationclient' component={Creation} />
      <Route path='/gererclient' component={GererClient} />
      <Route path='/gererparc' component={GererParc} />
      <Route path='/gerercapteur' component={GererCapteur} />
    </Switch>
  </main>
)

export default Main
