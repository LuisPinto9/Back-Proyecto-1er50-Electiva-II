const express = require("express");

require("dotenv").config();
require("./drivers/conect-db");

const app = express();

//setters
app.set("PORT", process.env.PORT);

//middelware (use)
app.use(express.json());
app.use("/client", require("./routes/clients"));
app.use("/reservation", require("./routes/reservations"));

app.listen(app.get("PORT"), () =>
  console.log(`server listen on ${app.get("PORT")}`)
);
