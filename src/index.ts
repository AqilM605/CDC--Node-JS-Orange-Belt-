// noinspection TypeScriptValidateJSTypes
import express from "express";
import cors from "cors";

require("dotenv").config("..env");

const app = express();
const dbUrl = process.env.DATABASE_URL;

const corsOptions = {
  origin: process.env.CORS,
};

app.use(express.static("public"));

// cors setup for app
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({ limit: "1mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true, limit: "1 mb", parameterLimit: 100000 })
);

// connect to mongo DB
let mongoose = require("mongoose");
mongoose
  .connect(dbUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to the ${dbUrl}!`);
  })
  .catch((err: any) => {
    console.log("Cannot connect to the database! \n", err);
    process.exit();
  });

// route section

require("./app/routes/auth.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/todo.routes")(app);

export default app;
