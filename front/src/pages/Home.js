import React, { useContext } from "react";
import Log from "../components/Log/index";
import Feed from "./Feed";
import { uidContext } from "../components/AppContext";

export default function Home() {
    const uid = useContext(uidContext);

    return (
        <>
        { uid ? (
            <Feed />
        ) : (
            <Log />
        )}
        </>
    )
}