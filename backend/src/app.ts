const express = require('express')
const propertyRoute = require("./routes/propertyRoutes")
const cors = require("cors")

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"
}))

app.use("/property", propertyRoute);

export = app;
