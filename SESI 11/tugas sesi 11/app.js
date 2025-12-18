const express = require("express");
const app = express();

const loggerMiddleware = require("./Middleware/loggerMiddleware");
const authRoutes = require("./routes_temp/authRoutes");
const activityRoutes = require("./routes_temp/activityRoutes");

app.use(express.json());
app.use(loggerMiddleware);

// ROUTES
app.use("/", authRoutes);
app.use("/activities", activityRoutes);

// ROOT TEST
app.get("/", (req, res) => {
  res.send("Student Activity Management API is running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
