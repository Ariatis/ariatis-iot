import React from 'react'
import { Switch, Route } from 'react-router-dom'

import AjoutCapteur from "./components/AjoutCapteur"
import Capteur from "./components/Capteur"
import Ensemble from "./components/Ensemble"
import GererEnsembles from "./components/GererEnsembles"

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AjoutCapteur} />
      <Route path='/mescapteurs' component={Capteur} />
      <Route path='/mesensembles' component={Ensemble} />
      <Route path='/gestionensembles' component={GererEnsembles} />
      <Route path='/ajoutcapteurs' component={AjoutCapteur} />
    </Switch>
  </main>
)

export default Main
