const express = require("express");
const { applyMiddleware } = require("./utils");
const middleware = require("./middleware");

const app = express();
const port = 5000;

const routers = require("./services");

applyMiddleware(middleware, app);
app.use("/api", routers);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
