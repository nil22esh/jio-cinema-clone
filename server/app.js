import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dbConnection from "./db/db.js";
import userRouter from "./Routes/user.routes.js";

// configuing environment variables
dotenv.config();

// initializing variables
const app = express();
const port = process.env.PORT || 3000;

// parse the request body using bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// cheking application with dummy route
app.get("/", (req, res) => {
  res.send("Healthy App!");
});

// creating routes
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
  // connecting to MongoDB
  dbConnection();
});
