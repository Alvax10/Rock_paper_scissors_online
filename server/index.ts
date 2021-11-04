// versión inicial
    // estructura (carpetas y archivos)
    // front básico (una pantalla que llame al back)
    // back básico (un endpoint)
    // deploy a heroku

// versión avanzada
    // funciona (todo el juego armado sin tanta prolijidad)

// correción y ajustes
    // sacar código de más
    // mejorar lectura de código
    // chequeo paso a paso

import { firestore, rtdb } from "./db";
import * as express from "express";
import * as cors from "cors";
import { nanoid } from "nanoid";
import * as path from "path";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

app.get("/env",(req, res)=> {
  res.json({
      environment: process.env.NODE_ENV,
  });
});

app.get("/db-env",(req, res)=> {
  res.json({
      "db-host": process.env.DB_HOST,
  });
});

app.post("/auth", (req, res) => {
    const { name } = req.body;

    userCollection.where("name", "==", name)
    .get().then((searchRes) => {
    if (searchRes.empty) {
    
        userCollection.add({
          name: name,
        }).then((newUserRef) => {
            res.json({
                id: newUserRef.id,
                new: true,
            });
        });
      } else {
        res.status(200).json({
         id: searchRes.docs[0].id,
        });
      }
  });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;
 
  userCollection
  .doc(userId.toString())
  .get().then((doc) => {
    if(doc.exists) {
 
      const roomRef = rtdb.ref("rooms/" + nanoid());
      
      roomRef.set({
          "player-1": {
            "userName": "",
            "userId": "",
            "online": false,
            "ready-to-play": "",
            "move": "",
          },
          "player-2": {
            "userName": "",
            "userId": "",
            "online": false,
            "ready-to-play": "",
            "move": "",
          },
        "owner-of-the-room": userId,
      }).then(() => {
        const roomLongId = roomRef.key;
        const roomId = 1000 + Math.floor(Math.random() * 999);
 
        roomsCollection.doc(roomId.toString())
        .set({
          "current-game": {
            "player-1": 0,
            "player-2": 0,
          },
          rtdbRoomId: roomLongId,
        })
        .then(() => {
          res.json({
            roomId: roomId,
          });
        });
      });
    } else {
      res.status(401).json({
        message: "no existis",
      });
    }
  });
});

app.get("/rooms/:roomId", (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.query;

  userCollection
  .doc(userId.toString())
  .get().then((doc) => {
    if(doc.exists) {
 
      roomsCollection
      .doc(roomId.toString())
      .get()
      .then((doc) => {
        const data = doc.data();
        res.json(data);
      });
 
    } else {
      res.status(401).json({
        message: "no existis",
      });
    }
  });
});

app.post("/rooms/:roomId", (req, res) => {
  const { roomId } = req.params;
  const { gameResult } = req.body;
  
  roomsCollection.doc(roomId.toString())
  .get().then((room) => {
    
    if (room.exists) {
      const roomData = room.data();
      
      if (gameResult == "wins-player1") {
        roomData["current-game"]["player-1"] += 1;
      }
      
      if (gameResult == "lose-player1") {
        roomData["current-game"]["player-2"] += 1;
      }

      if (gameResult == "tie") {
        roomData["current-game"]["player-2"] += 0;
        roomData["current-game"]["player-1"] += 0;
      }

      roomsCollection.doc(roomId.toString()).update(roomData);
    }
  }).then(() => {
    res.json({
      "message": "Another point to the winner player",
    });
  })
});

app.use(express.static("dist"));

const relativeRoute = path.resolve(__dirname, "/dist", "index.html");

app.listen(port, ()=> {
    console.log("Iniciado en el puerto:", port);
});