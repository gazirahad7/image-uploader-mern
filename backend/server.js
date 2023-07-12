require("dotenv").config();
const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

const morgan = require("morgan");
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// app.use("/uploads", express.static("uploads"));
//  routes
app.use(cors());
app.use(morgan("dev"));
app.use("/api/uploads", uploadRoutes);

// Connect to MongoDB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
