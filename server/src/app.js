const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./modules/routes/user.route");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// app.options("/api/posts", cors());
app.use("/api/user", userRoutes);


module.exports = app;
