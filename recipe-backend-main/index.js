import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import recipe from "./routes/recipe.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const PORT = 3500;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
});
const db = mongoose.connection;
db.on("error", (errorMessage) => console.log(errorMessage));
db.once("open", () => console.log("Connected successfully to the database"));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

app.use("/api/v1/", recipe);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
