/**
 * Import de useEffect de react qui permet d'appliquer des effets
 * Import de useState de react qui est un Hook qui permet d'ajouter l'état local React à des fonctions composants.
 * Import de useDispatch qui permet simplement de dispatch des actions redux
 */
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { uidContext } from "./components/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";

// Fonction qui permet de savoir si un utilisateur est connecté, return l'id de l'utilisateur qui se connecte
function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <uidContext.Provider value={uid}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </uidContext.Provider>
  );
}

export default App;
