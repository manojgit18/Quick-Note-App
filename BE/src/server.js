const express = require("express");
const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");
const ratelimiter = require("./middleware/rateLimiter");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use(ratelimiter);

app.use("/api/notes", notesRoutes);
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server started on port:${process.env.PORT}`);
  });
});
