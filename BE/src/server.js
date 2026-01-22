const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

/* CORS */
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

/* Serve frontend in production */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});

/* Graceful shutdown */
process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));
