import axios from 'axios'

// GET ALL CAPTEURS
export function getCapteurs() {
  return function(dispatch) {
    axios.get('/capteurs')
    .then(function(response) {
      dispatch({ type:"GET_CAPTEURS", payload:response.data })
    })
    .catch(function(err) {
      dispatch({ type:"GET_CAPTEURS_REJECTED", payload:err })
    })
  }
}

// GET ONE CAPTEUR
export function getOneCapteur(id) {
  return function(dispatch) {
    axios.get('/capteurs/' + id)
    .then(function(response) {
      dispatch({ type:"GET_ONE_CAPTEUR", payload:response.data })
    })
    .catch(function(err) {
      dispatch({ type:"GET_ONE_CAPTEUR_REJECTED", payload:err })
    })
  }
}

export function clearOneCapteur() {
  return function(dispatch) {
    dispatch({ type:"CLEAR_ONE_CAPTEUR", payload: []})
  }
}

// POST CAPTEUR
export function postCapteurs(capteurs) {
  return function(dispatch) {
    axios.post('/capteurs', capteurs)
    .then(function(response) {
      dispatch({ type:"POST_CAPTEURS", payload:response.data })
    })
    .catch(function(err) {
      dispatch({ type:"POST_CAPTEURS_REJECTED", payload:err })
    })
  }
}

// UPDATE CAPTEUR
export function updateCapteurs(id, newData) {
  return function(dispatch) {
    axios.put('/capteurs/' + id, newData)
    .then(function(response) {
      dispatch({type:"UPDATE_CAPTEURS", payload:response.data, id:id, datas:newData})
    })
    .catch(function(err) {
      dispatch({type:"UPDATE_CAPTEURS_REJECTED", payload:err})
    })
  }
}

// DELETE CAPTEUR
export function deleteCapteurs(id){
  return function(dispatch) {
    axios.delete('/capteurs/' + id)
    .then(function(response) {
      dispatch({type:'DELETE_CAPTEURS', payload:id})
    })
    .catch(function(err) {
      dispatch({type:'DELETE_CAPTEURS_REJECTED', payload:err})
    })
  }
}
