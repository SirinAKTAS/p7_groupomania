import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./signInForm";

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const pseudoError = document.getElementById("pseudoError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/user/signup`,
      data: {
        pseudo,
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          pseudoError.innerHTML = res.data.errors.pseudo;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          setFormSubmit(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4>Enregistrement réussi, veuillez-vous connecter</h4>
        </>
      ) : (
        <form
          action=""
          onSubmit={handleSignUp}
          id="sign-up-form"
          className="flex flex-col justify-center items-center text-tertiary "
        >
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
            className="bg-tertiary/25 rounded-md"
          />
          <div id="pseudoError" className="text-primary"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-tertiary/25 rounded-md"
          />
          <div id="emailError" className="text-primary"></div>
          <br />
          <label htmlFor="password" className="p-2">
            Mot de passe
          </label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-tertiary/25 rounded-md"
          />
          <div id="passwordError" className="text-primary"></div>
          <br />
          <input
            type="submit"
            value="S'inscrire"
            className="bg-secondary px-6 py-4 rounded-3xl text-primary cursor-pointer"
          />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
