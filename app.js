const express = require("express");

const app = express();




app.use("/", require("./routes"));



const port = process.env.PORT || 3060;








app.listen(port, () => {
    console.log(`Web server is listening at port ${port}`);
})