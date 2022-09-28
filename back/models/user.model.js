// Import d'une fonction de mongoose (unique-validator) pour rendre un élement unique
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

// Schema de l'utilisateur qui sera envoyé dans la BDD
const userSchema = mongoose.Schema(
    {
        pseudo: { 
            type: String, 
            required: true, 
            trim: true,
            minlength: 3,
            max: 55,
            unique: true,
            lowercase: true
        },  
        email: { 
            type: String,
            required: true, 
            unique: true, 
            trim: true,
            lowercase: true 
        },
        password: { 
            type: String, 
            required: true,
            minlength: 6,
            max: 1024 
        },
        picture: {
            type: String,
            default: "default-profile-pic.jpg"
        },
        bio: {
            type: String,
            max: 1024
        },
        likes: {
            type: [String]
        },
    },
    {
        timestamps: true
    }
);

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
  };

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);