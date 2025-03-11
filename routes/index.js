const routes = require("express").Router();



routes.get("/", (req, res) => {
     res.send("Hello world");
    
    });



routes.use("/contacts", require("./contacts"));



module.exports = routes;