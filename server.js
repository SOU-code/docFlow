const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

const userRoutes = require("./routes/userRoutes.js");
const docRoutes = require("./routes/docRoutes.js");

connectDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/docs", docRoutes);

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome to our API" });
// });

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`Server is running on port ${PORT}`);
});
