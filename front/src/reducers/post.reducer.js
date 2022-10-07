import {
  DELETE_POST,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/post.action";

const initialState = {};

/**
 * Fonction qui permet de récupérer les informations de tout les posts dans le cas où l'action GET_POSTS est appliqué
 * Lorsque l'action d'un like est appliqué on envoi dans le store l'id du nouveau like en + des autres likes
 * Lorsque l'action d'unlike est appliqué on envoi dans le store l'id du nouveau unlike en + des autres unlikes
 * Lorsqu'on modifie un post une action est appliqué au reducer, on envoi la nouvelle data dans le store
 * Suppression de la data dans le store
 */
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    case UPDATE_POST:
     return state.map((post) => {
      const payload = {...post}
      if (post._id === action.payload.postId) {
        if (action.payload.message) payload.message = action.payload.message
        if (action.payload.pictureUrl) payload.pictureUrl = action.payload.pictureUrl
      } return payload
     })
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    default:
      return state;
  }
}
