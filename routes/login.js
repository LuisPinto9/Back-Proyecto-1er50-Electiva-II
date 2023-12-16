const routes = require("express").Router();
const {
  validate,
  findAll,
  findById,
  save,
  deleteUser,
  update,
} = require("../controllers/loginController");
const check = require("../middleware/auth");

routes.get("/", check.auth, findAll);
routes.get("/:id", check.auth, findById);
routes.post("/save", check.auth, save);
routes.patch("/:id", check.auth, update);
routes.delete("/:id", check.auth, deleteUser);
routes.post("/", validate);

module.exports = routes;
