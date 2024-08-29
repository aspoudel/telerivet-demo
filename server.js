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
    size = arrSize;
    res.status(200).end();
  }
);

app.post(
  "/setArrayElements",
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    arr = [];
    const arrElements = req.body.vars.array_elements;
    if (size != arrElements.length) {
      res.set("Content-Type", "application/json");
      res.json({
        messages: [{ content: "Array Size Mismatched" }],
      });
      res.status(403).end();
    }
    for (let i = 0; i < arrElements.length; i++) {
      arr.push(parseInt(arrElements[i], 10));
    }
    res.status(200).end();
  }
);

app.post(
  "/searchElement",
  bodyParser.urlencoded({ extended: true }),
  (req, res) => {
    console.log(req.body);
    console.log("Arr size: ", size);
    console.log("Arr: ", arr);
    const searchElement = parseInt(req.body.vars.search_element);
    console.log("Search Element: " + searchElement);
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == searchElement) {
        index = i;
        break;
      }
    }
    let response_message = "";
    const to_number = req.body.to_number;
    console.log(to_number, typeof to_number);
    res.set("Content-Type", "application/json");
    if (index == -1) {
      response_message = "Element not found in the array.";
    } else {
      response_message = `Element found in index ${index}`;
    }
    res.json({
      messages: [{ content: response_message }, { to_number }],
    });
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
