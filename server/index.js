"use strict";
// versión inicial
// estructura (carpetas y archivos)
// front básico (una pantalla que llame al back)
// back básico (un endpoint)
// deploy a heroku
exports.__esModule = true;
// versión avanzada
// funciona (todo el juego armado sin tanta prolijidad)
// correción y ajustes
// sacar código de más
// mejorar lectura de código
// chequeo paso a paso
var db_1 = require("./db");
var express = require("express");
var cors = require("cors");
var port = process.env.PORT || 3000;
var app = express();
app.use(express.json());
app.use(cors());
var userCollection = db_1.firestore.collection("users");
var roomsCollection = db_1.firestore.collection("rooms");
app.post("/signup", function (req, res) {
    var name = req.body.name;
    userCollection.where("name", "==", name)
        .get().then(function (searchRes) {
        if (searchRes.empty) {
            userCollection.add({
                name: name
            }).then(function (newUserRef) {
                res.json({
                    id: newUserRef.id,
                    "new": true
                });
            });
        }
        else {
            res.status(400).json({
                message: "user already exists"
            });
        }
    });
});
app.use(express.static("../dist"));
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.listen(port, function () {
    console.log("Iniciado en:", port);
});
