const express = require("express");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Projects & Expenses Tracker API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});