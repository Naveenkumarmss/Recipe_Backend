import express from "express";
import {
  getAllRecipes,
  addRecipe,
  updateRecipe,
  getARecipe,
  deleteRecipe,
} from "../controller/recipe.js";
import fileUpload from "../middleware/fileUpload.js";

const router = express.Router();
router.route("/").get(getAllRecipes).post(fileUpload.single("image"), addRecipe);
router
  .route("/:id")
  .patch(fileUpload.single("image"), updateRecipe)
  .get(getARecipe)
  .delete(deleteRecipe);
export default router;
