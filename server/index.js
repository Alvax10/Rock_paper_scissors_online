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
var nanoid_1 = require("nanoid");
var port = process.env.PORT || 3000;
var app = express();
app.use(express.json());
app.use(cors());
var userCollection = db_1.firestore.collection("users");
var roomsCollection = db_1.firestore.collection("rooms");
app.use(express.static("../dist"));
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
                id: searchRes.docs[0].id
            });
        }
    });
});
app.post("/rooms", function (req, res) {
    var userId = req.body.userId;
    userCollection
        .doc(userId.toString())
        .get().then(function (doc) {
        if (doc.exists) {
            var roomRef_1 = db_1.rtdb.ref("rooms/" + (0, nanoid_1.nanoid)());
            roomRef_1.set({
                messages: [],
                from: userId
            }).then(function () {
                var roomLongId = roomRef_1.key;
                var roomId = 1000 + Math.floor(Math.random() * 999);
                roomsCollection.doc(roomId.toString())
                    .set({
                    rtdbRoomId: roomLongId
                })
                    .then(function () {
                    res.json({
                        roomId: roomId
                    });
                });
            });
        }
        else {
            res.status(401).json({
                message: "no existis"
            });
        }
    });
});
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/dist/index.html");
});
app.listen(port, function () {
    console.log("Iniciado en el puerto:", port);
});
