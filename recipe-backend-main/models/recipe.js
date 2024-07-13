import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  ingredients: {
    type: String,
    require: true,
  },
  steps: {
    type: Array,
    require: true,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const recipe = mongoose.model("recipe", recipeSchema);

export default recipe;
