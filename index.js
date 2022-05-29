const express = require('express'); //express
const app = express(); //express
const path = require('path'); //ejs

app.set("views", path.join(__dirname, "views")); //ejs
app.set("view engine", "ejs"); //ejs

app.get('/', (req, res) =>
{
    res.render('home')
}) //express

app.listen(3000, () =>{
    console.log('serving on port 3000')
}) //express