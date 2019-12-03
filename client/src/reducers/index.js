import { combineReducers } from 'redux'
import { capteurReducer } from './CapteurReducer'
import { clientReducer } from './ClientReducer'
import { parcReducer } from './ParcReducer'

export default combineReducers({
  capteurs: capteurReducer,
  clients: clientReducer,
  parcs: parcReducer
})
