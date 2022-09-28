import React, { useState } from "react";
import SignInForm from "./signInForm";
import SignUpForm from "./signUpForm";

const Log = () => {
    const [signUpModal, setSignUpModal] = useState(true);
    const [signInModal, setSignInModal] = useState(false);

   const handleModals = (e) => {
    if (e.target.id === "register") {
        setSignInModal(false);
        setSignUpModal(true);
    } else if (e.target.id === "login") {
        setSignInModal(true);
        setSignUpModal(false);
    }
   };

    return (
        <>  
            <header className="bg-white">
                <div className="flex justify-between flex-col items-center p-2">
                    <img className="h-20 w-full object-cover-fit md:h-full md:w-48 " src="../images/logoAvecNom.jpg" alt="Logo groupomania" />
                    <nav>
                        <ul className="flex pt-6 gap-16">
                            <li onClick={handleModals} id='register' className={signUpModal ? "text-primary" : "text-secondary"}>S'inscrire</li>
                            <li onClick={handleModals} id='login'className={signInModal ? "text-primary" : "text-secondary"}>Se connecter</li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="flex justify-center items-center">
                <div className="bg-white m-12 px-12 pt-8 pb-4 rounded-2xl">
                    {signUpModal && <SignUpForm />}
                    {signInModal && <SignInForm />}
                </div>
            </div>
        </>
    );
};

export default Log;