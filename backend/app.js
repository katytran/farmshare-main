const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const utilsHelper = require("./helpers/utils.helper");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

/* DB Connections */
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Farmshare app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Mount the routes under '/api'
app.use("/api", indexRouter);

/* Initialize Error Handling */
app.use((err, req, res, next) => {
  const statusCode = err.message.split(" - ")[0];
  const message = err.message.split(" - ")[1];
  if (!isNaN(statusCode)) {
    utilsHelper.sendResponse(res, statusCode, false, null, { message }, null);
  } else {
    utilsHelper.sendResponse(
      res,
      500,
      false,
      null,
      { message: err.message },
      "Internal Server Error"
    );
  }
});
