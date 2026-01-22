const express = require("express");
const cors = require("cors");
const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");
require("dotenv").config();

const app = express();

/* ✅ CORS MUST COME FIRST */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* Handle preflight requests */
app.options("*", cors());

app.use(express.json());

/* ✅ Rate limiter AFTER CORS */
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 5001, () => {
    console.log(`Server started on port ${process.env.PORT || 5001}`);
  });
});
