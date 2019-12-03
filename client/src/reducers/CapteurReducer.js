export function capteurReducer(state={capteurs:[], oneCapteur:{}}, action) {
  switch(action.type) {
    // GET ALL
    case "GET_CAPTEURS":
      return {...state, capteurs:[...action.payload]}

    case "GET_CAPTEURS_REJECTED":
      return action.payload

    // GET ONE
    case "GET_ONE_CAPTEUR":
      return {...state, oneCapteur:action.payload}

    case "CLEAR_ONE_CAPTEUR":
      return {...state, oneCapteur:action.payload}

    case "GET_ONE_CAPTEUR_REJECTED":
      return action.payload

    // POST
    case "POST_CAPTEUR":
      return {...state, postCapteurs:action.payload}

    case "POST_CAPTEUR_REJECTED":
      return action.payload

    // DELETE
    case "DELETE_CAPTEUR":
      const currentDataToDelete = state.capteurs.filter(capteur => capteur._id !== action.payload)

      return {...state, capteurs:currentDataToDelete}

    case "DELETE_CAPTEUR_REJECTED":
      return action.payload

    // UPDATE
    case "UPDATE_CAPTEUR":
      if(action.payload.ok > 0) {
        const capteursArray = [...state.capteurs]
        const newDatas = action.datas
        let oldCapteur = capteursArray[capteursArray.findIndex(capteur => capteur._id === action.id)]
        const newCapteur = {
          _id: oldCapteur._id,
          clientID: oldCapteur.clientID,
          parcID: oldCapteur.parcID,
          constructeur: newDatas.constructeur,
          latitude: newDatas.latitude,
          longitude: newDatas.longitude,
          nom: newDatas.nom,
          refModele: newDatas.refModele,
          reseau: newDatas.reseau,
          typeMesure: newDatas.typeMesure,
          uniteMesure: newDatas.uniteMesure
        }
        capteursArray[capteursArray.findIndex(capteur => capteur._id === action.id)] = newCapteur

        return {
          ...state,
          capteurs: capteursArray,
          msg:'Votre capteur a bien été modifié',
          style:'success'
        }
      } else {
        return {
          ...state,
          msg:'Aucun capteur n\'a été modifié',
          style:'alert'
        }
      }

    case "UPDATE_CAPTEUR_REJECTED":
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
