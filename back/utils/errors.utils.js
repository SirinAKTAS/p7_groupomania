module.exports.signUpErrors = (error) => {
    let errors = { pseudo: "", email: "", password: "" };

    if (error.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect (min 3 caractères) et/ou déjà pris";

    if (error.message.includes('email'))
        errors.email = "Email incorrect et/ou déjà pris";

    if (error.message.includes('password'))
        errors.password = "Mot de passe trop court (6 caractères min)";

    return errors;
};

module.exports.signInErrors = (error) => {
    let errors = { email: "", password: "" };

    if (error.message.includes('email'))
        errors.email = "Email incorrect ou inconnu";

    if (error.message.includes('password'))
        errors.password = "Mot de passe incorrect";

    return errors;
};