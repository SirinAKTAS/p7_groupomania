import React, { useContext } from "react";
import Log from "../components/Log/index";
import { uidContext } from "../components/AppContext";
import Feed from "./Feed";
import FeedAdmin from "../components/Feed/feedAdmin";

// Si lors de la connection l'id est celui de l'admin alors on affiche la page admin
// Si il existe un id et différent de celui de l'admin alors on affiche la page feed sinon on retourne à la page log
export default function Home() {
  const uid = useContext(uidContext);
  const adminId = process.env.REACT_APP_ADMIN_ID;
  console.log(uid);
  console.log(adminId);

  if (uid === adminId) {
    return <><FeedAdmin /></>;
  } else {
  return <>{uid ? <Feed /> : <Log />}</>;
  }
}