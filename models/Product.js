const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
  {

    type: {
      type: String,
      enum: ['produit', 'service'],
      default: 'service',
    },

    name: {
      type: String,
      required: [true, "merci d'entrer un nom pour ce produits"],
    },

    designation: {
      type: String,
      required: [true, "merci d'entrer un nom pour ce produits"],
    },

  
    cover: {
      type: String,
    },
    
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Product", ProductSchema);