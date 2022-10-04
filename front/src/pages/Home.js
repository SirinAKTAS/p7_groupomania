import React, { useContext } from "react";
import Log from "../components/Log/index";
import { uidContext } from "../components/AppContext";
import Feed from "./Feed";

export default function Home() {
  const uid = useContext(uidContext);

  return <>{uid ? <Feed /> : <Log />}</>;
}
