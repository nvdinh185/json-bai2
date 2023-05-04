import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";

const PORT = process.env.PORT || 3000;

const app = express();
dotenv.config();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("THIS IS SERVER");
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
