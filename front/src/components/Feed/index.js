import React, { useState } from "react";
import Logout from "../Log/logout";
import ProfilForm from "./profilForm";
import FeedForm from "./feedForm";
import NewFormPost from "./newPostForm";

// Function principal qui permet l'affichage des différentes pages sur une seule route
export default function FeedPage() {
  const [profilFormModal, setProfilFormModal] = useState(false);
  const [feedFormModal, setFeedFormModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === "profil") {
      setFeedFormModal(false);
      setProfilFormModal(true);
    } else if (e.target.id === "home") {
      setFeedFormModal(true);
      setProfilFormModal(false);
    }
  };

  return (
    <>
      <header className="bg-white w-full">
        <div className="flex justify-between flex-col items-center p-2 md:flex-row">
          <img
            className="h-20 w-full object-cover-fit md:h-full md:w-48 "
            src="../images/logoAvecNom.jpg"
            alt="Logo groupomania"
          />
          <nav>
            <ul className="flex pt-6 gap-16 md:pt-0">
              <li
                onClick={handleModals}
                id="home"
                className={feedFormModal ? "text-primary cursor-pointer" : "text-secondary cursor-pointer"}
              >
                Acceuil
              </li>
              <li
                onClick={handleModals}
                id="profil"
                className={profilFormModal ? "text-primary cursor-pointer" : "text-secondary cursor-pointer"}
              >
                Profil
              </li>
              <Logout />
            </ul>
          </nav>
        </div>
      </header>
      <div className="mt-6 mx-2 flex justify-center items-center">
        <div className="flex w-full flex-col justify-center items-center md:w-[600px] 2xl:w-[900px] ">
          {feedFormModal && (
            <div className="flex justify-center flex-col w-full items-start rounded-2xl bg-white py-6 px-2">
              <NewFormPost />
            </div>
          )}
          <div className="w-full flex justify-center flex-col items-start bg-white my-12 mx-8 py-8 px-2 rounded-2xl md:w-[600px] 2xl:w-[900px]">
            {feedFormModal && <FeedForm />}
            {profilFormModal && <ProfilForm />}
          </div>
        </div>
      </div>
    </>
  );
}
