import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AjoutCapteur from "./components/AjoutCapteur"
import Capteur from "./components/Capteur"
import GererEnsembles from "./components/GererEnsembles"

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AjoutCapteur} />
      <Route path='/mescapteurs' component={Capteur} />
      <Route path='/gestionensembles' component={GererEnsembles} />
    </Switch>
  </main>
)

export default Main
