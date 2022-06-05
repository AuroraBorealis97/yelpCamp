const express = require("express"); //express
const path = require("path"); //ejs
const mongoose = require("mongoose"); //mongo
const methodOverride = require('method-override'); //enable use of PUT, DELETE, and other non POST requests
const Campground = require("./models/campground"); //mongoose models

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //mongo

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:")); //mongo check for erros
db.once("open", () => {
  console.log("Database connected");
}); //mongo check for errors

const app = express(); //express

app.use(express.urlencoded({ extended: true })); //parse form body data
app.use(methodOverride('_method')); //enable use of PUT, DELETE, and other non POST requests

app.set("views", path.join(__dirname, "views")); //ejs
app.set("view engine", "ejs"); //ejs

app.get("/", (req, res) => {
  res.render("home");
}); //express

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  const { id } = req.params;
  res.render("campgrounds/index", { campgrounds, id });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
}); // create new campground (create new after index page but before show page)

app.post("/campgrounds", async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`campgrounds/${campground._id}`)
}); //add new campground

app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
}); //view indivdual campgrounds



app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
}); //edit indivdual campgrounds

app.put("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    
  res.redirect(`/campgrounds/${campground._id}`)

}); // update campground

app.delete('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const deleteCampground = await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
})

app.listen(3000, () => {
  console.log("serving on port 3000");
}); //express
