const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json")
app
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use("/", require("./routes"));

// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("connected to mongoDB");
//   })
//   .catch((err) => {
//     console.error("Could not connect to mongoDB");





//   });








const port = process.env.PORT || 3060;

app.listen(port, () => {
  console.log(`Web server is listening at port ${port}`);
});
