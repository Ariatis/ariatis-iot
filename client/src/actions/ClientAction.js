import axios from 'axios'

// GET ALL CLIENTS
export function getClients() {
  return function(dispatch) {
    axios.get('/clients')
    .then(function(response) {
      dispatch({ type:"GET_CLIENTS", payload:response.data })
    })
    .catch(function(err) {
      dispatch({ type:"GET_CLIENTS_REJECTED", payload:err })
    })
  }
}

// GET ONE CLIENT
export function getOneClient(id) {
  return function(dispatch) {
    axios.get('/clients/' + id)
    .then(function(response) {
      dispatch({ type:"GET_ONE_CLIENT", payload:response.data })
    })
    .catch(function(err) {
      dispatch({ type:"GET_ONE_CLIENT_REJECTED", payload:err })
    })
  }
}

export function clearOneClient() {
  return function(dispatch) {
    dispatch({ type:"CLEAR_ONE_CLIENT", payload: []})
  }
}

// POST CLIENTS
export function postClient(clients) {
  return function(dispatch) {
    axios.post('/clients', clients)
    .then(function(response) {
      dispatch({ type:"POST_CLIENT", payload:response.data })
    })
    .catch(function(err) {
      dispatch({ type:"POST_CLIENT_REJECTED", payload:err })
    })
  }
}

// UPDATE CLIENTS
export function updateClient(id, newData) {
  return function(dispatch) {
    axios.put('/clients/' + id, newData)
    .then(function(response) {
      dispatch({type:"UPDATE_CLIENT", payload:response.data, id:id, datas:newData})
    })
    .catch(function(err) {
      dispatch({type:"UPDATE_CLIENT_REJECTED", payload:err})
    })
  }
}

// DELETE CLIENTS
export function deleteClient(id){
  return function(dispatch) {
    axios.delete('/clients/' + id)
    .then(function(response) {
      dispatch({type:'DELETE_CLIENT', payload:id})
    })
    .catch(function(err) {
      dispatch({type:'DELETE_CLIENT_REJECTED', payload:err})
    })
  }
}
