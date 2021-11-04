// Guardar información para compartir entre pages/componentes
// Guardar en localStorage (lo necesario)
// Interactuar con local Storage/API

import { rtdb } from "../server/rtdb";
type move = "scissor" | "paper" | "rock";
type result = "wins-player1" | "wins-player2" | "tie";

const API_BASE_URL = "http://localhost:3000";

const state = {
    data: {
        "userName-player1": "",
        "userName-player2": "",
        "userId-player1": "",
        "userId-player2": "",
        "player1-online": false,
        "player2-online": false,
        "player1-ready-to-play": "",
        "player2-ready-to-play": "",
        roomId: "",
        rtdbRoomId: "",
        rtdb: {},
        
        currentGame: {
            "player1-move": "none",
            "player2-move": "none",
        },
        history: {
            "player-1": 0,
            "player-2": 0,
        }
    },
    listeners: [],
    init() {
        const localData = JSON.parse(localStorage.getItem("matches"));
        if (!localData) {
            return;
        }
        this.setState(localData);
    },
    getState() {
        return this.data;
    },
    setFirstPlayerUserName(userName) {
        const currentState = this.getState();
        
        currentState["userName-player1"] = userName.value;
        this.setState(currentState);
    },
    setSecondPlayerUserName(userName) {
        const currentState = this.getState();

        currentState["userName-player2"] = userName.value;
        this.setState(currentState);
    },
    signInFirstPlayer(callback) {
        const currentState = this.getState();

        if (currentState["userName-player1"]) {

            fetch(API_BASE_URL + "/auth", {
                method:"POST",
                headers: {
                    Accept:"application/json",
                    "content-type": "application/json",
                    "Cross-Origin-Resource-Policy": "cross-origin",
                },
                body: JSON.stringify({ name: currentState["userName-player1"] }),
            }).then((res) => {
                return res.json();

            }).then((data) => {
                
                currentState["userId-player1"] = data.id;
                this.setState(currentState);

                callback();
            });
        } else {
            if (callback) console.error("userName isn't specified");
        }
    },
    signInSecondPlayer(callback) {
        const currentState = this.getState();

        if (currentState["userName-player2"]) {

            fetch(API_BASE_URL + "/auth", {
                method:"POST",
                headers: {
                    Accept:"application/json",
                    "content-type": "application/json",
                    "Cross-Origin-Resource-Policy": "cross-origin",
                },
                body: JSON.stringify({ name: currentState["userName-player2"] }),
            }).then((res) => {
                return res.json();

            }).then((data) => {
                
                currentState["userId-player2"] = data.id;
                this.setState(currentState);

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
        let userId = currentState["userId-player1"] || currentState["userId-player2"];

        if (currentState["userId-player2"] == "") {
            userId = currentState["userId-player1"]

        } else if (currentState["userId-player2"] == "") {
            userId = currentState["userId-player1"]
        }
        
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
        }
    },
    listenRoom(){
        const currentState = this.getState();
        const roomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);

        roomRef.on("value", (snap) => {
            currentState.rtdb = snap.val();
            this.setState(currentState);

        });
    },
    loadInfoToTheRtdb() {
        const currentState = this.getState();
        const chatRoomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);

        if (currentState["userName-player2"] == "") {

            chatRoomRef.update({

                "player-1": {
                    online: true,
                    userId: currentState["userId-player1"],
                    userName: currentState["userName-player1"],
                },
            });
            currentState["player1-online"] = true;

        } else if (currentState["userName-player1"] == "") {

            chatRoomRef.update({

                "player-2": {
                    online: true,
                    userId: currentState["userId-player2"],
                    userName: currentState["userName-player2"],
                },
            });
            currentState["player2-online"] = true;
        }
        this.setState(currentState);
    },
    firstPlayerReady(callback?) {
        const currentState = this.getState();
        const chatRoomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);

        chatRoomRef.update({

            "player-1": {
                "ready-to-play": "start",
                online: true,
                userId: currentState["userId-player1"],
                userName: currentState["userName-player1"],
            },
        });
        currentState["player1-ready-to-play"] = "start";

        this.setState(currentState);
        callback();
    },
    secondPlayerReady(callback?) {
        const currentState = this.getState();
        const chatRoomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);

        chatRoomRef.update({

            "player-2": {
                "ready-to-play": "start",
                online: true,
                userId: currentState["userId-player2"],
                userName: currentState["userName-player2"],
            },
        });
        currentState["player2-ready-to-play"] = "start";

        this.setState(currentState);
        callback();
    },
    setMove(move: move, callback?) {
        const currentState = this.getState();
        const chatRoomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);
        let player = currentState["rtdb"]["player-1"]["userName"] || currentState["rtdb"]["player-2"]["userName"];

        if (currentState["userName-player2"] == "") {

            currentState["rtdb"]["player-1"]["move"] = move;
            player = currentState["rtdb"]["player-1"]["userName"];

            chatRoomRef.update({

                "player-1": {
                    "ready-to-play": "start",
                    online: true,
                    userId: currentState["userId-player1"],
                    userName: player,
                    move: move,
                },
            });

            currentState.currentGame["player1-move"] = move;
            this.setState(currentState);
        }
        if (currentState["userName-player1"] == "") {

            currentState["rtdb"]["player-2"]["move"] = move;
            player = currentState["rtdb"]["player-2"]["userName"];

            chatRoomRef.update({

                "player-2": {
                    "ready-to-play": "start",
                    online: true,
                    userId: currentState["userId-player2"],
                    userName: player,
                    move: move,
                },
            });

            currentState.currentGame["player2-move"] = move;
            this.setState(currentState);
        }
        callback();
    },      
    getResult(player1Move: move, player2Move: move) {

        const player1Wins = [
            player1Move === "rock" && player2Move === "scissor",
            player1Move === "paper" && player2Move === "rock",
            player1Move === "scissor" && player2Move === "paper",
        ].includes(true);

        const player2Wins = [
            player2Move === "rock" && player1Move === "scissor",
            player2Move === "paper" && player1Move === "rock",
            player2Move === "scissor" && player1Move === "paper",
        ].includes(true);

        let gameResult: result;

        if (player1Wins) {
            gameResult = "wins-player1";
        } else if (player2Wins) {
            gameResult = "wins-player2";
        } else {
            gameResult = "tie";
        }

        return gameResult;
    },
    getCurrentGame() {
        const currentState = this.getState();
        return currentState.currentGame;
    },
    changeHistory(gameResult: result) {
        const currentState = this.getState();
        const roomId = currentState.roomId;

        fetch(API_BASE_URL + "/rooms/" + roomId, {
            method: "post",
            headers: {
                Accept:"application/json",
                "content-type": "application/json",
                "Cross-Origin-Resource-Policy": "cross-origin",
            },
            body: JSON.stringify({ gameResult: gameResult}),
        });

        if (gameResult == "wins-player1") {
            currentState["history"]["player-1"] = +1;
        }

        if (gameResult == "wins-player2") {
            currentState["history"]["player-2"] = +1;
        }

        this.setState(currentState);
    },
    restartGame() {
        const currentState = this.getState();
        const chatRoomRef = rtdb.ref("/rooms/" + currentState.rtdbRoomId);

        chatRoomRef.get().then((snap) => {
            const InfoOfPlayers = snap.val();
            
            InfoOfPlayers["player-1"].move = "";
            InfoOfPlayers["player-2"].move = "";
        });

        currentState.currentGame["player1-move"] = "";
        currentState.currentGame["player2-move"] = "";

        this.setState(currentState);
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

export { state, move };