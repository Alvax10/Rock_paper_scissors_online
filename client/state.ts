// Guardar información para compartir entre pages/componentes
// Guardar en localStorage (lo necesario)
// Interactuar con local Storage/API

import { rtdb } from "../server/rtdb";

const API_BASE_URL = "http://localhost:3000";

const state = {
    data: {
        "userName-player1": "",
        "userName-player2": "",
        "userId-player1": "",
        "userId-player2": "",
        roomId: "",
        rtdbRoomId: "",
        
        currentGame: {
            "player1-move": "none",
            "player2-move": "none",
        },
        history: {
            player1: 0,
            player2: 0,
        },
    },
    listeners: [],
    init() {
        const lastLocalStorageState = localStorage.getItem("matches");
    },
    getState() {
        return this.data;
    },
    setFirstPlayerUserName(userName) {
        const currentState = this.getState();
        
        currentState["userName-player1"] = userName.value;
        // console.log("este log está antes del setState de setUserName");
        this.setState(currentState);
    },
    setSecondPlayerUserName(userName) {
        const currentState = this.getState();

        currentState["userName-player2"] = userName.value;
        // console.log("este log está antes del setState de setUserName");
        this.setState(currentState);
    },
    signInFirstPlayer(callback) {
        const currentState = this.getState();

        // console.log("Esto es antes del fetch en el sign in");

        if (currentState["userName-player1"]) {
            // console.log("este es el sign in");
            fetch(API_BASE_URL + "/auth", {
                method:"POST",
                headers: {
                    Accept:"application/json",
                    "content-type": "application/json",
                    "Cross-Origin-Resource-Policy": "cross-origin",
                },
                body: JSON.stringify({ name: currentState["userName-player1"] }),
            }).then((res) => {
                // console.log(res);
                return res.json();
            }).then((data) => {
                // console.log(data);
                currentState["userId-player1"] = data.id;

                this.setState(currentState);
                // console.log("me terminé de logear");
                callback();
            });
        } else {
            if (callback) console.error("userName isn't specified");
        }
    },
    signInSecondPlayer(callback) {
        const currentState = this.getState();

        // console.log("Esto es antes del fetch en el sign in");

        if (currentState["userName-player2"]) {
            // console.log("este es el sign in");
            fetch(API_BASE_URL + "/auth", {
                method:"POST",
                headers: {
                    Accept:"application/json",
                    "content-type": "application/json",
                    "Cross-Origin-Resource-Policy": "cross-origin",
                },
                body: JSON.stringify({ name: currentState["userName-player2"] }),
            }).then((res) => {
                // console.log(res);
                return res.json();
            }).then((data) => {
                // console.log(data);
                currentState["userId-player2"] = data.id;

                this.setState(currentState);
                // console.log("me terminé de logear");
                callback();
            });
        } else {
            if (callback) console.error("userName isn't specified");
        }
    },
    showsTheRoomId(roomId) {
        const currentState = this.getState();
       
        currentState.roomId = roomId.toString();
        this.setState(currentState);
    },
    askNewRoom(callback?) {
        const currentState = this.getState();
 
        if (currentState["userId-player1"]) {
            return fetch(API_BASE_URL + "/rooms", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    "Cross-Origin-Resource-Policy": "cross-origin",
                },
                body: JSON.stringify({ userId: currentState["userId-player1"] }),
            })
            .then((res) => {
                return res.json();
            })
            .then((data: string) => {
                const seeIfRoomId = data["roomId"];
                this.showsTheRoomId(seeIfRoomId);
                
                this.setState(currentState);
                callback();
            });
        } else {
            if (callback) console.error("no hay user id");
        }
    },
    accessToRoom(callback?) {
        const currentState = this.getState();
        const roomId = currentState.roomId;
        const userId = currentState["userId-player2"] || currentState["userId-player1"];

        if (currentState.roomId) {
 
            fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId, {
            // method GET es por defecto, no hace falta ponerlo
                headers: {
                    "Cross-Origin-Resource-Policy": "cross-origin",
                },
            })
            .then((res) => {
                return res.json();
   
            }).then((data) => {
                currentState.rtdbRoomId = data.rtdbRoomId;
                this.setState(currentState);
                callback();
            });
        } else {
            if (callback) console.error("El roomId no existe");
            callback;
        }
    },
    loadFirstPlayerInfoToRtdb(callback?) {
        const currentState = this.getState();
        const chatRoomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);
                
        chatRoomRef.on("value", (snap) => {
            const informationFromFirebase = snap.val();
                
            currentState["userId-player1"] == informationFromFirebase["current-game"]["player-1"].userId;
            currentState["userName-player1"] == informationFromFirebase["current-game"]["player-1"].userName;

            console.log(informationFromFirebase);
        });
        this.setState(currentState);
        callback();
    },
    loadSecondPlayerInfoToRtdb(callback?) {
        const currentState = this.getState();
        const chatRoomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);
                
        chatRoomRef.on("value", (snap) => {
            const informationFromFirebase = snap.val();
                
            currentState["userId-player2"] == informationFromFirebase["current-game"]["player-2"].userId;
            currentState["userName-player2"] == informationFromFirebase["current-game"]["player-2"].userName;

            console.log(informationFromFirebase);
        });
        this.setState(currentState);
        callback();
    },
    connectPlayersState(callback?) {
        const currentState = this.getState();
        const chatRoomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);

        chatRoomRef.on("value", (snap) => {
            const informationFromFirebase = snap.val();

            informationFromFirebase["current-game"]["player-1"].userId == currentState["userId-player1"];
            informationFromFirebase["current-game"]["player-1"].userName == currentState["userName-player1"];

            informationFromFirebase["current-game"]["player-2"].userId == currentState["userId-player2"];
            informationFromFirebase["current-game"]["player-2"].userName == currentState["userName-player2"];
        });

        this.setState(currentState);
        callback();
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
        localStorage.setItem("matches", JSON.stringify(newState));
        console.log("Soy el state, he cambiado:", newState);
    },
    suscribe(callback: (any) => any) {
        this.listeners.push(callback);
    }
}

export { state };