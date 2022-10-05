import { GET_USERS } from "../actions/users.action";

const initialState = {};

// Fonction qui permet de récupérer les informations de tout les users dans le cas où l'action GET_USERS est appliqué
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}
