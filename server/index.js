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
var path = require("path");
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
var userCollection = db_1.firestore.collection("users");
var roomsCollection = db_1.firestore.collection("rooms");
app.get("/env", function (req, res) {
    res.json({
        environment: process.env.NODE_ENV
    });
});
app.get("/db-env", function (req, res) {
    res.json({
        "db-host": process.env.DB_HOST
    });
});
app.post("/auth", function (req, res) {
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
            res.status(200).json({
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
                "player-1": {
                    "userName": "",
                    "userId": "",
                    "online": false,
                    "ready-to-play": "",
                    "move": ""
                },
                "player-2": {
                    "userName": "",
                    "userId": "",
                    "online": false,
                    "ready-to-play": "",
                    "move": ""
                },
                "owner-of-the-room": userId
            }).then(function () {
                var roomLongId = roomRef_1.key;
                var roomId = 1000 + Math.floor(Math.random() * 999);
                roomsCollection.doc(roomId.toString())
                    .set({
                    "current-game": {
                        "player-1": 0,
                        "player-2": 0
                    },
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
app.get("/rooms/:roomId", function (req, res) {
    var roomId = req.params.roomId;
    var userId = req.query.userId;
    userCollection
        .doc(userId.toString())
        .get().then(function (doc) {
        if (doc.exists) {
            roomsCollection
                .doc(roomId.toString())
                .get()
                .then(function (doc) {
                var data = doc.data();
                res.json(data);
            });
        }
        else {
            res.status(401).json({
                message: "no existis"
            });
        }
    });
});
app.post("/choice/:longRoomId/:userId", function (req, res) {
    var longRoomId = req.params.longRoomId;
    var userId = req.params.userId;
    var move = req.body.move;
    userCollection.doc(userId.toString())
        .get().then(function (user) {
        if (user.exists) {
            var roomRef = db_1.rtdb.ref("rooms/" + longRoomId);
            roomRef.set({
                userId: userId,
                move: move
            }).then(function () {
                res.json({
                    userId: userId,
                    move: move
                });
            });
        }
        else {
            res.status(401).json({
                message: "user didn't choose a hand"
            });
        }
    });
});
app.use(express.static("dist"));
var relativeRoute = path.resolve(__dirname, "/dist", "index.html");
app.listen(port, function () {
    console.log("Iniciado en el puerto:", port);
});
