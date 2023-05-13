const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./src/utils/db").sequelize;
const app = express();
const port = 3000;
const apiRouter = require("./src/routes/api.route");
const webhookRouter = require("./src/routes/webhook.route");

const User = require("./src/models/user");
const Meter = require("./src/models/meter");
const logger = require("./src/utils/logger");

// dotenv.config();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  logger.info("hello");
  res.json({ message: "ok" });
});

app.use("/api/v1", apiRouter);
app.use("/webhook/v1", webhookRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(port, () => {
  // console.log(process.env.ACCESS_TOKEN);
  console.log(`Server is running on port ${port}.`);
});
