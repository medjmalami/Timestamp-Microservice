// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const { isDate, isNumeric } = require("validator");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  const paramsDate = req.params.date;
  if (!paramsDate) {
    res.status(200).json({
      unix: Date.now(),
      utc: new Date().toUTCString(),
    });
  } else if (isDate(req.params.date)) {
    const date = new Date(req.params.date);
    const unixTime = date.getTime();
    res.status(200).json({
      unix: unixTime,
      utc: date.toUTCString(),
    });
  } else if (isNumeric(req.params.date)) {
    const date = new Date(parseInt(req.params.date));
    res.status(200).json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    res.status(400).json({
      error: "Invalid Date",
    });
  }
});
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
