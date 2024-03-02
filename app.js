const express = require("express");
const mongoose = require("mongoose");  // Corrected the spelling here
const bodyParser = require("body-parser");
const homeRouter = require("./routers/homeRouter");
  require("./db/conn");

  const port = process.env.PORT || 7000;


const app = express();


app.set('view engine','ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', homeRouter)

app.listen(port)
