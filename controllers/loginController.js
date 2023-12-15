const User = require("../models/model-user");

exports.validate = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({
    username: username,
    password: password,
  });


  if (!user) {
    res.status(404).json({
      state: false,
      error: `Usuario no encontrado.`,
    });
  } else {
    try {
      res.status(200).json({ state: true, data: "Usuario encontrado" });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  }
};
