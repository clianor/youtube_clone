const express = require("express");
const { applyMiddleware } = require("./utils");
const middleware = require("./middleware");
const config = require("./config/key");
const mongoose = require("mongoose");

const path = require("path");
global.appRoot = path.resolve(__dirname, "../");

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
  .catch((error) => console.log(error));

const routers = require("./services");

applyMiddleware(middleware, app);
app.use("/api", routers);

app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
