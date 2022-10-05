/**
 * Import de toutes les dépendances dont on a besoin
 * Création d'un store pour stocker nos données en mémoire, on le place au plus haut pour permettre de l'utiliser partout 
 * Thunk permet d'écrire des fonctions de création d'actions qui retournent une fonction ou une Promise au lieu de retourner une simple action.
 * rootReducer récupère toute la compilation des différents fichier reducers
 */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { getUsers } from "./actions/users.action";

// Extention d'un dev tools pour gérer le store
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Récupérations de la data de tout les users dans le store
store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
