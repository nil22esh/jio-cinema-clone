import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () =>
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("DB Connected Successfully!");
    })
    .catch((error) => {
      console.log(`DB Error: ${error}`);
    });

export default dbConnection;
