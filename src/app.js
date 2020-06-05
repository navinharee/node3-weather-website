const path = require("path"); //code node moduel,no need to install it

const express = require("express"); //this is npm library/module so this needs to be installed before specified

const hbs = require("hbs");

const app = express();

const port = process.env.PORT || 3000

const forecast = require('../src/utils/forecast');
const geocode = require('../src/utils/geocode');

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

//Denfine paths for Express config
const publicDir = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", templatePath); //by default express looks for directory 'views' under the root project
//if we want to customize the views directory to any name(templates) we need to explicitly tell the express about
//the views dirctory name change as above...
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDir));

//1st arg - name of the view to render,
//2nd arg - Object which will be used in the html
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App!!!",
    name: "Navin Haree!!!"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    author: "Navin",
    exp: "7 years",
    rating: "Excellent",
    title: "About Page!!!",
    name: "Navin Haree!!!"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    content: "Help is available!!!",
    contactUs: "716-473-2188",
    hours: "24/7 help available!!!",
    title: "HELP Page!!!",
    name: "Navin Haree!!!"
  });
});

//specific pattern wildcards
app.get("/help/*", (req, res) => {
  res.render("error", {
    image: "/img/notFound.jpg",
    errorMsg: "Help article not found!!!",
    title: "404 Error Page!!!",
    name: "Navin!!!"
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!req.query.address) {
    return res.send({
      error: " You must provide the address!!!"
    });
  }


  geocode(address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {

    if (error) {
      return res.send({
        error
      })
    }

    console.log(latitude)

    forecast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        forecast: foreCastData,
        location: location,
        address: req.query.address
      })

    })

  });




});

//generic wilcards
app.get("*", (req, res) => {
  res.render("error", {
    image: "/img/404.jpg",
    errorMsg: "Page Not Found!!!",
    title: "404 Error Page!!!",
    name: "Navin!!!"
  });
});

// Four routes available above!!!! and the corresponding route handler above

app.listen(port, () => {
  console.log("Server is up on port 3000");
});