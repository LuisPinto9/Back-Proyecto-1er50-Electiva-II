const routes = require("express").Router();
const { validate } = require("../controllers/loginController");

routes.post("/", validate);

module.exports = routes;
