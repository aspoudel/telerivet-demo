const express = require("express");
const PORT = 80;

const app = express();

app.get("/", (req, res) => {
  res.send("Get Success!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
