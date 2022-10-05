import { GET_USER, UPDATE_BIO } from "../actions/user.action";

const initialState = {};

/**
 * Fonction qui permet de récupérer les informations dun user dans le cas où l'action GET_USER est appliqué
 * Envoi de la nouvelle bio lors de la modification du bio
 */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    default:
      return state;
  }
}
