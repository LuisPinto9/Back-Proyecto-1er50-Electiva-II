const User = require("../models/model-user");
const jwt = require("../services/jwt");

exports.validate = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({
    username: username,
    password: password,
  });
  if (Object.values(user).length < 1) {
    res.status(404).json({
      state: false,
      error: `Usuario no encontrado.`,
    });
  } else {
    try {
      const token = jwt.createToken(user)
      res.status(200).json({ state: true, data: "Usuario encontrado",token });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  }
};
