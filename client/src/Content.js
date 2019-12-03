import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './containers/Home'
import CreationClient from './containers/CreationClient'
import CreationParc from './containers/CreationParc'
import CreationCapteur from './containers/CreationCapteur'
import GererClient from './components/backoffice/GererClient'
import GererParc from './components/backoffice/GererParc'
import GererCapteur from './components/backoffice/GererCapteur'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/creationclient' component={CreationClient} />
      <Route path='/creationparc' component={CreationParc} />
      <Route path='/creationcapteur' component={CreationCapteur} />
      <Route path='/gererclient' component={GererClient} />
      <Route path='/gererparc' component={GererParc} />
      <Route path='/gerercapteur' component={GererCapteur} />
    </Switch>
  </main>
)

export default Main
