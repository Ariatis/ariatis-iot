import axios from 'axios'

// GET ALL PARCS
export function getParcs() {
  return function(dispatch) {
    axios.get('/parcs')
    .then(function(response) {
      dispatch({ type:"GET_PARCS", payload:response.data })
    })
    .catch(function(err) {
      dispatch({ type:"GET_PARCS_REJECTED", payload:err })
    })
  }
}

// GET ONE PARC
export function getOneParc(id) {
  return function(dispatch) {
    axios.get('/parcs/' + id)
    .then(function(response) {
      dispatch({ type:"GET_ONE_PARC", payload:response.data })
    })
    .catch(function(err) {
      dispatch({ type:"GET_ONE_PARC_REJECTED", payload:err })
    })
  }
}

export function clearOneParc() {
  return function(dispatch) {
    dispatch({ type:"CLEAR_ONE_PARC", payload: []})
  }
}

// POST PARC
export function postParc(parcs) {
  return function(dispatch) {
    axios.post('/parcs', parcs)
    .then(function(response) {
      dispatch({ type:"POST_PARC", payload:response.data })
    })
    .catch(function(err) {
      dispatch({ type:"POST_PARC_REJECTED", payload:err })
    })
  }
}

// UPDATE PARC
export function updateParc(id, newData) {
  return function(dispatch) {
    axios.put('/parcs/' + id, newData)
    .then(function(response) {
      dispatch({type:"UPDATE_PARC", payload:response.data, id:id, datas:newData})
    })
    .catch(function(err) {
      dispatch({type:"UPDATE_PARC_REJECTED", payload:err})
    })
  }
}

// DELETE PARC
export function deleteParc(id){
  return function(dispatch) {
    axios.delete('/parcs/' + id)
    .then(function(response) {
      dispatch({type:'DELETE_PARC', payload:id})
    })
    .catch(function(err) {
      dispatch({type:'DELETE_PARC_REJECTED', payload:err})
    })
  }
}
