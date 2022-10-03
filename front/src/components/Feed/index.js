import React, { useState } from "react";
import Logout from "../Log/logout";
import ProfilForm from "./profilForm";
import FeedForm from "./feedForm";
import NewFormPost from "./newPostForm";

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
            <header className="bg-white">
                <div className="flex justify-between flex-col items-center p-2">
                    <img className="h-20 w-full object-cover-fit md:h-full md:w-48 " src="../images/logoAvecNom.jpg" alt="Logo groupomania" />
                    <nav>
                        <ul className="flex pt-6 gap-16">
                            <li onClick={handleModals} id="home" className={feedFormModal ? "text-primary" : "text-secondary"}>Acceuil</li>
                            <li onClick={handleModals} id="profil" className={profilFormModal ? "text-primary" : "text-secondary"}>Profil</li>
                            <Logout />
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="flex flex-col m-6 justify-center items-center">
                {feedFormModal && (
                <div className="flex justify-center flex-col w-full items-start rounded-2xl bg-white py-6 px-2">
                    <NewFormPost />
                </div>
                )}
                <div className="w-full flex justify-center flex-col items-start bg-white my-12 mx-8 py-8 px-2 rounded-2xl">
                    {feedFormModal && <FeedForm />}
                    {profilFormModal && <ProfilForm />}
                </div>
            </div>
        </>
    )
}