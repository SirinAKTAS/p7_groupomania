module.exports.signUpErrors = (error) => {
    let errors = { pseudo: "", email: "", password: "" };

    if (error.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou déjà pris";

    if (error.message.includes('email'))
        errors.email = "Email incorrect ou déjà pris";

    if (error.message.includes('password'))
        errors.password = "Mot de passe incorrect ou trop court";

    return errors;
};