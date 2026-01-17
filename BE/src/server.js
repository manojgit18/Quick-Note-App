const express = require("express");
const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();

app.use(express.json());

connectDB();

app.use("/api/notes", notesRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server started on port:${process.env.PORT}`);
});
