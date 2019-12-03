export function clientReducer(state={clients:[], oneClient:{}}, action) {
  switch(action.type) {
    // GET ALL
    case "GET_CLIENTS":
      const clients = [...action.payload]
      clients.sort((a,b) => {
        let comparaison = 0
        let nomA = a.nom
        let nomB = b.nom

        if(nomA.toLowerCase() > nomB.toLowerCase()) {
          comparaison = 1
        } else {
          comparaison = -1
        }

        return comparaison
      })

      return {...state, clients:clients}

    case "GET_CLIENTS_REJECTED":
      return action.payload

    // GET ONE
    case "GET_ONE_CLIENT":
      return {...state, oneClient:action.payload}

    case "CLEAR_ONE_CLIENT":
      return {...state, oneClient:action.payload}

    case "GET_ONE_CLIENT_REJECTED":
      return action.payload

    // POST
    case "POST_CLIENT":
      return {...state, postClients:action.payload}

    case "POST_CLIENT_REJECTED":
      return action.payload

    // DELETE
    case "DELETE_CLIENT":
      const currentDataToDelete = state.clients.filter(client => client._id !== action.payload)

      return {...state, clients:currentDataToDelete}

    case "DELETE_CLIENT_REJECTED":
      return action.payload

    // UPDATE
    case "UPDATE_CLIENT":
      if(action.payload.ok > 0) {
        const clientsArray = [...state.clients]
        const newDatas = action.datas
        let oldClient = clientsArray[clientsArray.findIndex(client => client._id === action.id)]
        const newClient = {
          _id: oldClient._id,
          nom: newDatas.nom,
          description: newDatas.description
        }
        clientsArray[clientsArray.findIndex(client => client._id === action.id)] = newClient

        return {
          ...state,
          clients: clientsArray,
          msg:'Votre client a bien été modifié',
          style:'success'
        }
      } else {
        return {
          ...state,
          msg:'Aucun client n\'a été modifié',
          style:'alert'
        }
      }

    case "UPDATE_CLIENT_REJECTED":
      return {
        ...state,
        payload: action.payload,
        msg:'Oups quelque chose s\'est mal déroulé ! Réessayez plus tard.',
        style:'danger'
      }

    // DEFAULT
    default:
      return state
  }
}
