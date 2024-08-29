if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("GET Home Success");
});

app.post("/", (req, res) => {
  console.log(req);
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
