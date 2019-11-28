export function capteurReducer(state={capteurs:[]}, action) {
  switch(action.type) {
    // GET
    case "GET_CAPTEURS":
      return {...state, capteurs:[...action.payload]};

    case "GET_CAPTEURS_REJECTED":
      return action.payload;

    // POST
    case "POST_CAPTEURS":
      return {...state, capteurs:[...state.capteurs, action.payload]};

    case "POST_CAPTEURS_REJECTED":
      return action.payload;

    // DELETE
    case "DELETE_CAPTEURS":
      const currentArmeToDelete = state.capteurs.filter(capteur => capteur._id !== action.payload);

      return {...state, capteurs:currentArmeToDelete};

    case "DELETE_CAPTEURS_REJECTED":
      return action.payload;

    // UPDATE
    case "UPDATE_CAPTEURS":

      const capteursArray = [...state.capteurs];
      const newCapteurs = action.datas;
      capteursArray[capteursArray.findIndex(capteur => capteur._id === action.id)] = newCapteurs;

      return {
        ...state,
        capteurs: capteursArray,
        payload: action.payload,
        msg:'Votre capteur a bien été modifié',
        style:'success'
      };

    case "UPDATE_CAPTEURS_REJECTED":
      return {
        ...state,
        payload:action.payload,
        msg:'Oups quelque chose s\'est mal déroulé ! Réessayez plus tard.',
        style:'danger'
      };

    // DEFAULT
    default:
      return state;
  }
};
