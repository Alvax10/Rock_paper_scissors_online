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

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

app.post("/signup", (req, res) => {
    const { name } = req.body;

    userCollection.where("name", "==", name)
    .get().then((searchRes) => {
        if (searchRes.empty) {
            
            userCollection.add({
                name
            }).then((newUserRef) => {
                res.json({
                    id: newUserRef.id,
                    new: true
                });
            });
        } else {
            res.status(400).json({
                message: "user already exists",
            });
        }
    })
});

app.use(express.static("../dist"));

app.get("*", (req, res)=> {
    res.sendFile(__dirname+"/dist/index.html");
});

app.listen(port, ()=> {
    console.log("Iniciado en:", port);
});