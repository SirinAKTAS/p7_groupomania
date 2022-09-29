import React from "react";
import Logout from "../components/Log/logout";

export default function Feed() {
    return (
        <>  
            <header className="bg-white">
                <div className="flex justify-between flex-col items-center p-2">
                    <img className="h-20 w-full object-cover-fit md:h-full md:w-48 " src="../images/logoAvecNom.jpg" alt="Logo groupomania" />
                    <nav>
                        <ul className="flex pt-6 gap-16">
                            <li>Home</li>
                            <li>Profil</li>
                            <Logout />
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="flex justify-center items-center">
                <div className="bg-white m-12 px-12 pt-8 pb-4 rounded-2xl">
                </div>
            </div>
        </>
    )
}