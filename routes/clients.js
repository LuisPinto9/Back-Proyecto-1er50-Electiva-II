const routes = require("express").Router();
const {
  save,
  update,
  findAll,
  findId,
  findById,
  deleteClient,
} = require("../controllers/clientController");
const check = require("../middleware/auth");

routes.get("/", check.auth, findAll);
routes.get("/:id", check.auth, findId);
routes.get("/byId/:id", check.auth, findById);
routes.post("/", check.auth, save);
routes.patch("/:id", check.auth, update);
routes.delete("/:id", check.auth, deleteClient);

module.exports = routes;
