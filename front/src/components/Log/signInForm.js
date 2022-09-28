import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}api/user/login`,
        withCredentials: true,
        data: {
            email,
            password,
        },
    })
    .then((res) => {
      console.log(res)
        if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
        } else {
            window.location = "/";
        }
    })
    .catch ((err) => {
        console.log(err);
    });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form" className="flex flex-col justify-center items-center text-tertiary ">
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
      <div id='emailError' className="text-primary"></div>
      <br />
      <label htmlFor="password" className="p-2">Mot de passe</label>
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
      <input type="submit" value="Se connecter" className="bg-secondary px-6 py-4 rounded-3xl text-primary" />
    </form>
  );
};

export default SignInForm;
