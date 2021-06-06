const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      //   res.write(" The condition currently is " + description + ".");
      //   res.write(" The temperature in Shimla is " + temp + " degrees Celcius.");
      //   res.write("<img src=" + imageURL + ">");
      //   res.send();

      res.send(
        "<h1>The temperature in " +
          query +
          " is " +
          temp +
          " degrees Celcius.</h1>" +
          "<h3>There will be " +
          description +
          " all around.</h3>" +
          "<img src=" +
          imageURL +
          ">"
      );

      //    console.log(weatherData)
      //     const object={
      //         name:"Rishav",
      //         age:22
      //     }
      //    console.log(JSON.stringify(object));
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
