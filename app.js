const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

let values = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/", function(req, res){
  res.render("index");
  values = [];
  error = [];
});


app.post("/", function(req, res){
  location = req.body.location;
  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=metric&appid=7038e75579a38ad22fa2c412ebdbf338";
  https.get(url, function(response){
    if(response.statusCode != 200){
      response.on("data", function(data){
        res.sendFile(__dirname + "/failure.html");
      });
    }
    else{
      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = Math.round(weatherData.main.temp);
        const weatherDescription = weatherData.weather[0].description;
        const name = weatherData.name;
        const icon = weatherData.weather[0].icon;
        values.push(temp);
        values.push(weatherDescription);
        values.push(name);
        values.push(icon);

        res.redirect("/weather");
      });
    }
  });
});


app.get("/weather", function(req, res){
  res.render("weather", {tempValue: values[0], descValue: values[1], nameValue: values[2], iconValue: values[3]});
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started at port 3000");
});
