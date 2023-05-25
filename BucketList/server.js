// IMPORT PACKAGES
const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors')
require('dotenv').config()
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');


// CONFIG EXPRESS
app.use(express.json())  // POST METHOD
app.use(cookieParser());

const bp = require('body-parser')
app.use(bp.json({limit: '50mb'}))
app.use(bp.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }))
// app.use(cors()) // Having 2 localhost port to communicate
// Change the app.use(cors()) to the one below
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000'
}));
// CONFIG MONGOOSE
require("./server/config/mongoose.config");
// ROUTES
require("./server/routes/user.routes")(app)
require("./server/routes/place.routes")(app)

// PORT
app.listen(port, () => console.log(`Please report to the bridge: ${port}`));
