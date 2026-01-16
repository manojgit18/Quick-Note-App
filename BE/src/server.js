const express = require("express");
const notesRoutes = require("./routes/notesRoutes");
const app = express();


app.use(express.json());


app.use("/api/notes", notesRoutes);

app.listen(5001, () => {
  console.log("server started on port: 5001");
});
