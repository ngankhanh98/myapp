const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  nameDish: String,
  duration: String,
  date: Date,
  complex: String,
  serving: Number,
  uri: String,
  directions: Array,
  ingredients: Array,
});

const RecipeModel = mongoose.model("recipes", RecipeSchema);

module.exports = RecipeModel;
