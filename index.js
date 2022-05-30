const express = require("express"); //express
const path = require("path"); //ejs
const mongoose = require("mongoose"); //mongo
const Campground = require('./models/campground'); //mongoose models

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //mongo

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); //mongo check for erros
db.once('open', () => {
    console.log('Database connected');
}); //mongo check for errors

const app = express(); //express

app.set("views", path.join(__dirname, "views")); //ejs
app.set("view engine", "ejs"); //ejs

app.get("/", (req, res) => {
  res.render("home");
}); //express

app.get('/makecampground', async (req, res) =>{
  const camp = new Campground({title: 'my Backyard'});
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log("serving on port 3000");
}); //express
