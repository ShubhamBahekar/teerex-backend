const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const connectMongoDb = require("./mongoose");
const cookieParser = require("cookie-parser");
const {PORT,URI} = require("./config/index")
const customResponses = require("./helpers/customResponses")
const apiRouters = require("./routes")


app.use(express.static("public"));
// app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("./uploads"));
app.disable("x-powered-by");
app.use(cookieParser());
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());
app.use(customResponses)
//  const upload = multer();
//  app.use(upload.none());


 mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);

 connectMongoDb(URI);

app.use(apiRouters);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log("This is the invalid field ->", err.field);
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
