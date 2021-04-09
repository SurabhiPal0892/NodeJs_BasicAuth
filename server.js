const express = require("express");
const user = require("./routes/user.routes");
const auth = require("./routes/auth.routes");
const parser = require("body-parser");
require('./mongoose/mongoose.connection');

const app = express();
app.use(parser.json());
app.use("/", auth);
app.use("/users", user);

const port = process.env.PORT || "8000";

const server=app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports=server;