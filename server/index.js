const express = require("express");
const { applyMiddleware } = require("./utils");
const middleware = require("./middleware");
const config = require("./config/key");
const mongoose = require("mongoose");

const app = express();
let port = 5000;

if (process.env.NODE_ENV === "production") {
  port = 3000;
} else {
  port = 5000;
}

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const routers = require("./services");

applyMiddleware(middleware, app);
app.use("/api", routers);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
