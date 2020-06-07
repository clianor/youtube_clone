const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

const routers = require("./services");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", routers);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
