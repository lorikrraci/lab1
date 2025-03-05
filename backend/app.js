const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const errorMiddleware = require("./middlewares/errors");
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1/auth", auth); // Correctly mounts /api/v1/auth/login
app.use("/api/v1", payment);
app.use("/api/v1", order);

app.use(errorMiddleware);

module.exports = app;

app.use(cors()); // Allows all origins (for development; restrict in production)
app.use(express.json());

const playerRoutes = require("./routes/player"); // Adjust path if needed
app.use("/api/v1", playerRoutes); // This prefixes all routes in product.js with /api

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
