const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://jefryjimenez2011:EPq0rCQYMXFLUkIv@cluster0.bqdjf0f.mongodb.net/Week1");

const path = require("path");

// Servir archivos estáticos desde la carpeta "cliente"
app.use(express.static(path.join(__dirname, "../client")));

// Ruta para servir el archivo index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});
const teacherController = require('./controllers/teacherController');
const {
  teacherPatch,
  teacherPost,
  teacherGet,
  teacherDelete
} = teacherController;

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// listen to the task request
app.get("/api/teachers", teacherGet);
app.post("/api/teachers", teacherPost);
app.patch("/api/teachers/:id", teacherPatch);
app.put("/api/teachers", teacherPatch);
app.delete("/api/teachers/:id", teacherDelete);

app.listen(3001, () => console.log(`Example app listening on port 3001!`))