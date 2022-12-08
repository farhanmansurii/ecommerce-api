const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userrouter = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
dotenv.config();
app.use(
  cors({
    origin: ["http://127.0.0.1:5173/", "https://productapi.vercel.app/"],
  })
);
app.use(express.json());
app.use("/api/user", userrouter);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to cluster"));

app.listen(5000, () => console.log("listening on port 5000"));
