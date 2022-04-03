const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// import routers
const adminRoute = require("./routers/adminRoutes");
const aboutRoute = require("./routers/aboutRoutes");
const serviceRoute = require("./routers/serviceRoutes");

const middleware = [cors(), morgan("dev"), cookieParser()];

app.use(middleware);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//routes
app.use("/admin", adminRoute);
app.use("/about", aboutRoute);
app.use("/service", serviceRoute);

app.get("/", function (req, res) {
  res.status(200).json({ success: "get success" });
});

app.get("*", function (req, res) {
  res.status(404).json({ msg: "Not Found" });
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
//   });
// }

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ltldm.mongodb.net/dcl?retryWrites=true&w=majority`;
const port = process.env.PORT || 5050;

mongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    app.listen(port, () => {
      console.log(`Server run in port ${port}`);
      console.log("Database connect..");
    });
  }
);
