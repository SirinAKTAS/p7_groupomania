// Import d'une fonction de mongoose (unique-validator) pour rendre un élement unique
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema de l'utilisateur qui sera envoyé dans la BDD
const userSchema = mongoose.Schema(
    {
        pseudo: { 
            type: String, 
            required: true, 
            trim: true,
            minLength: 3,
            maxLength: 55,
            unique: true
        },  
        email: { 
            type: String,
            required: true, 
            unique: true, 
            trim: true 
        },
        password: { 
            type: String, 
            required: true,
            minLength: 6,
            maxLength: 1024 
        },
        picture: {
            type: String,
            default: "default-profile-pic.jpg"
        },
        bio: {
            type: String,
            maxLength: 1024
        },
    },
    {
        timestamps: true
    }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);