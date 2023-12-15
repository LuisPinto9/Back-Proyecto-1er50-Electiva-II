const mongoose = require("mongoose");
const { Schema } = mongoose;

const SchemaUser = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", SchemaUser);
