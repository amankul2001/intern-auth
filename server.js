const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = require("./config/db");
const userRoute = require("./routes/userRoute");

app.use(express.json());

app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
