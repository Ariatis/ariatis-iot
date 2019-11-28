import { combineReducers } from 'redux'
import { capteurReducer } from './CapteurReducer'

export default combineReducers({
  capteurs: capteurReducer
})
