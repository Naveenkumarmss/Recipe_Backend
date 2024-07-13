import recipeModel from "../models/recipe.js";
import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";

const getAllRecipes = async (req, res) => {
  try {
    const listItems = await recipeModel.find();
    res.status(200).json(listItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getARecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, steps } = req.body;
    const newSteps = JSON.parse(steps);
    const { destination, filename } = req.file;
    const filePath = destination + "/" + filename;

    const { secure_url } = await cloudinary.uploader.upload(filePath, {
      public_id: randomUUID(),
      folder: "recipe",
    });
    console.log(secure_url);
    const recipe = await recipeModel.create({
      title,
      ingredients,
      steps: newSteps,
      image: secure_url,
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, steps, image } = req.body;
    console.log(title, ingredients, steps, image);
    const newSteps = JSON.parse(steps || null);
    const { destination, filename } = req.file ?? {};
    var secure_url = image || null;
    if (req?.file) {
      var { secure_url } = await cloudinary.uploader.upload(destination + "/" + filename, {
        public_id: randomUUID(),
        folder: "recipe",
      });
    }
    const recipe = await recipeModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        ingredients,
        steps: newSteps,
        image: secure_url,
      },
      { new: true }
    );
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await recipeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `deleted the list` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllRecipes, addRecipe, updateRecipe, getARecipe, deleteRecipe };
