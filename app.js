require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homeRouter = require('./routers/homeRouter')
const port  = process.env.PORT || 8080;

const app  = express();

// db con

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection; 

db.on("error",()=>{console.log("error in conection");})
db.once('open',()=>{console.log("Connected");})

app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', homeRouter)

app.listen(port)