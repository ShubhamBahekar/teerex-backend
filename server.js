const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const connectMongoDb = require("./connection");
const router = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const userRouter = require("./routes/userRoute");
const checkoutPageRouter = require("./routes/checkoutRoute")
const cookieParser = require("cookie-parser");
const {PORT,URI} = require("./config/index")
const Verify = require("./middlewares/verify")
const customResponses = require("./helpers/customResponses")


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

app.use("/user",userRouter);
 app.use("/product",Verify, router);
app.use("/cart",Verify,cartRouter);
app.use("/checkout",Verify,checkoutPageRouter);


app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log("This is the invalid field ->", err.field);
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
