const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Création du schéma utilisateur
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Veuillez entrer un nom d'uttilisateur"],
    },

    photo: {
      type: String
    },

    // Informations de connexion
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },

    email: {
      type: String,
      required: [true, 'Veuillez entrer une adresse EMAIL'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez ajouter une adresse email valide',
      ],
    },
    password: {
      type: String,
      required: [true, 'Veuillez entrer un mot de passe'],
      minlength: 6,
      select: false, // Ne pas renvoyer le mot de passe par défaut lors des requêtes
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // Timestamps pour suivre les créations et modifications
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Inclure les propriétés virtuelles lors de la sérialisation JSON
    toObject: { virtuals: true }, // Inclure les propriétés virtuelles lors de la conversion en objet
  },
)

// ... Autres propriétés, méthodes et hooks ...
UserSchema.pre('save', async function (next) {
  // Si le mot de passe est modifié, le hacher
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }

  next()
})

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return resetToken
}

// Export du modèle utilisateur
module.exports = mongoose.model('User', UserSchema)
