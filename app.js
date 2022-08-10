const express = require("express");
const app = express();
const router = require("./routes/router");
const path = require("path");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

module.exports = app;
