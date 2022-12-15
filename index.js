const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userrouter = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const projectRoute = require("./routes/projects");
dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/user", userrouter);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/project", projectRoute);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to cluster"));

app.listen(5000, () => console.log("listening on port 5000"));
