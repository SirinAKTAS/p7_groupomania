/**
 * Import de bcrypt pour la sécurité d'un élement
 * Import de jsonwebtoken pour sécurisé le token
 * Import du dossier .env pour sécurisé un élement
 */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
const fs = require("fs");
const ObjectID = require("mongoose").Types.ObjectId;
const { signUpErrors, signInErrors } = require("../utils/errors.utils");

// ************************************************ AUTH *********************************************************************

/**
 * Crypter le mot de passe 10x pour la sécurité du champ
 * Hashage du mot de passe
 * Ajout de l'utilisateur dans la BDD après la création du compte
 */
exports.signup = async (req, res, next) => {
  const { pseudo, email, password } = req.body;

  try {
    const user = await User.create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  } catch (error) {
    const errors = signUpErrors(error);
    res.status(200).send({ errors });
  }
};

/**
 * Vérification lors du login pour savoir si les éléments dans le body existe dans la BDD
 * Utilisation de .compare grâce à l'import de bcrypt qui permet ici de comparer le mdp du body et celui de la BDD
 * Lors de la connection on obtien l'userId + un Token qui a été noté dans le .env + un délai du token de 24h
 */
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: maxAge,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id, token });
  } catch (error) {
    const errors = signInErrors(error);
    res.status(200).json({ errors });
  }
};

// Lors du logout on supprime le cookie et on redirige l'utilisateur sur une page précise
exports.logout = (req, res, next) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

// ********************************************* USER SETTINGS ****************************************************************

// Afficher tout les Users
exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// Afficher un User
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

/**
 * Vérification de l'utilisateur pour permettre ou non la modification de l'utilisateur
 * Si Non = msg d'erreur, si Oui = maj dans la BDD
 */
exports.modifyUser = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("ID unknown : " + req.params.id);
  }
  try {
    User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        } else {
          return res.status(500).send({ message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};