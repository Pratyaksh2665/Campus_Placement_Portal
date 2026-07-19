const express = require("express");

const app = express();

const PORT = process.env.PORT || 2500;
app.get("/", (req, res) => {
  res.send("Campus Placement Portal API Running");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
