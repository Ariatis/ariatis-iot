export function parcReducer(state={parcs:[], oneParc:{}}, action) {
  switch(action.type) {
    // GET ALL
    case "GET_PARCS":
      const parcs = [...action.payload]
      parcs.sort((a,b) => {
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

      return {...state, parcs:parcs}

    case "GET_PARCS_REJECTED":
      return action.payload

    // GET ONE
    case "GET_ONE_PARC":
      return {...state, oneParc:action.payload}

    case "CLEAR_ONE_PARC":
      return {...state, oneParc:action.payload}

    case "GET_ONE_PARC_REJECTED":
      return action.payload

    // POST
    case "POST_PARC":
      return {...state, parcs:[...state.parcs, action.payload]}

    case "POST_PARC_REJECTED":
      return action.payload

    // DELETE
    case "DELETE_PARC":
      const currentDataToDelete = state.parcs.filter(client => client._id !== action.payload)

      return {...state, parcs:currentDataToDelete}

    case "DELETE_PARC_REJECTED":
      return action.payload

    // UPDATE
    case "UPDATE_PARC":
      if(action.payload.ok > 0) {
        const parcsArray = [...state.parcs]
        const newDatas = action.datas
        let oldClient = parcsArray[parcsArray.findIndex(client => client._id === action.id)]
        const newClient = {
          _id: oldClient._id,
          clientID: oldClient.clientID,
          nom: newDatas.nom,
          description: newDatas.description
        }
        parcsArray[parcsArray.findIndex(client => client._id === action.id)] = newClient

        return {
          ...state,
          parcs: parcsArray,
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

    case "UPDATE_PARC_REJECTED":
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
