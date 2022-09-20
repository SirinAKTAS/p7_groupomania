/**
 * Import de bcrypt pour la sécurité d'un élement
 * Import de jsonwebtoken pour sécurisé le token
 * Import du dossier .env pour sécurisé un élement
 */
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const User = require('../models/user.model');
 require('dotenv').config();
 const fs = require('fs');
 const ObjectID = require('mongoose').Types.ObjectId;
 const { signUpErrors } = require('../utils/errors.utils');

// ************************************************ AUTH *********************************************************************

/**
 * Crypter le mot de passe 10x pour la sécurité du champ
 * Hashage du mot de passe 
 * Ajout de l'utilisateur dans la BDD après la création du compte
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch((error) =>{
            const errors = signUpErrors(error);
            res.status(400).json({ errors })
          });
      })
      .catch(error => res.status(500).json({ error }));
};

/**
 * Vérification lors du login pour savoir si les éléments dans le body existe dans la BDD
 * Utilisation de .compare grâce à l'import de bcrypt qui permet ici de comparer le mdp du body et celui de la BDD
 * Lors de la connection on obtien l'userId + un Token qui a été noté dans le .env + un délai du token de 24h
 */
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_KEY, {
        expiresIn: maxAge
    })
}
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Email/Mot de passe incorrect !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Email/Mot de passe incorrect !' });
                    }
                    const token = createToken(user._id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge});
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        
        })
        .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
    res.clearCookie("jwt");
    res.status(200).json("OUT");
};


// ********************************************* USER SETTINGS ****************************************************************


// Afficher tout les Users
exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

// Afficher un User
exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

/**
 * Vérification de l'utilisateur pour permettre ou non la modification de l'utilisateur
 * Si Non = msg d'erreur, si Oui = maj dans la BDD
 */
exports.modifyUser = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id);
    }
    try {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                } else {
                    return res.status(500).send({ message: err});
                }
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};

exports.deleteUser = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID unknown : ' + req.params.id)
    }

    try {
        User.deleteOne({_id: req.params.id}).exec();
        res.status(200).json({ message: "Utilisateur supprimé."});
    } catch (err) {
        return res.status(500).json({ message: err});
    }
};