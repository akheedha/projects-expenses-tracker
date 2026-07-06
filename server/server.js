const express = require("express");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/projects", projectRoutes);
app.use("/expenses", expenseRoutes);
app.use("/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("BuildMetrics AI API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});