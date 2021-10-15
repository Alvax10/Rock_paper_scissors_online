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
          from: userId,
        }).then(() => {
          const roomLongId = roomRef.key;
          const roomId = 1000 + Math.floor(Math.random() * 999);
  
          roomsCollection.doc(roomId.toString())
          .set({
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
  
app.use(express.static("dist"));

const relativeRoute = path.resolve(__dirname, "/dist", "index.html");
console.log(relativeRoute);

app.listen(port, ()=> {
    console.log("Iniciado en el puerto:", port);
});