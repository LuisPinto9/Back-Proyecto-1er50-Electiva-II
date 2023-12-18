const User = require("../models/model-user");
const jwt = require("../services/jwt");
const bcrypt = require("bcrypt");

exports.validate = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({
    username: username,
  });
  let pwd = bcrypt.compareSync(password, user[0].password);
  if (!pwd) {
    res.status(404).json({
      state: false,
      error: `Usuario no encontrado.`,
    });
  } else {
    try {
      const token = jwt.createToken(user[0]);
      res.status(200).json({ state: true, data: "Usuario encontrado", token });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  }
};

exports.save = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({
    username: username,
  });
  if (user.length < 1) {
    //cifrar contraseña
    let pwd = await bcrypt.hash(password, 10);
    req.body.password = pwd;
    const newUser = new User(req.body);
    try {
      const data = await newUser.save();
      res.status(200).json({ state: true, data: data });
    } catch (err) {
      res.status(500).json({ state: false, error: err.message });
    }
  } else {
    return res
      .status(409)
      .json({ state: false, error: "El usuario ya existe." });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  let pwd = await bcrypt.hash(req.body.password, 10);
  req.body.password = pwd;
  const updateInformation = req.body;
  try {
    const data = await User.updateOne({ _id: id }, { $set: updateInformation });
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await User.find({});
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.findById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findById(id);
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByIdAndDelete(id);
    res.status(200).json({ state: true, data: data });
  } catch (err) {
    res.status(500).json({ state: false, error: err.message });
  }
};
