const routes = require("express").Router();

const controllers = require("../controllers/contacts");

routes.get("/", controllers.hello);
routes.get("/contacts", controllers.getAll);
routes.get("/:id", controllers.getSingle);






module.exports = routes;