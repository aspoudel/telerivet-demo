if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("GET Home Success");
});

const WEBHOOK_SECRET = "Secret01";

let arr = [];
let size = 0;

app.post(
  "/setArraySize",
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    const arrSize = req.body.vars.array_size;
    console.log("Array Size", arrSize);
    size = arrSize;
    res.status(200).end();
  }
);

app.post(
  "/setArrayElements",
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    console.log(req.body);
    res.status(200).end();
  }
);

app.post("/", bodyParser.urlencoded({ extended: true }), (req, res) => {
  const secret = req.body.secret;
  if (secret !== WEBHOOK_SECRET) {
    res.status(403).end();
    return;
  }
  if (req.body.event == "ivr_callback") {
    let content = req.body.content;
    let from_number = req.body.from_number;
    let phone_id = req.body.phone_id;
    console.log(content, from_number, phone_id);
    res.json({
      messages: [{ content: "Thanks for your message!" }],
    });
  }
  res.status(200).end();
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
