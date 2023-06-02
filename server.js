import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import bookRoute from "./routes/bookRoute.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/client'));

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + '/client/list.html');
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("CONNECTED MONGODB SUCCESS");
  } catch (error) {
    throw error;
  }
};

mongoose.set("strictQuery", true);

mongoose.connection.on("disconnected", () => {
  console.log("MONGODB DISCONNECTED");
});
mongoose.connection.on("connected", () => {
  console.log("MONGODB CONNECTED");
});

//ROUTES
app.use("/books", bookRoute);

app.listen(PORT, () => {
  connect();
  console.log("CONNECTED BACKEND SUCCESS", PORT);
});
