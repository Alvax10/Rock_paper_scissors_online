import { Router } from "@vaadin/router";
import { state } from "../state";

class shareRoom extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
    }
    connectedCallback() {
        this.render();
        const currentState = state.getState();

        state.loadInfoToTheRtdb();
        state.listenRoom();
        state.suscribe(() => {

            // Esta sección de código hace lo mismo que la página join-room (leer esa página para entender que hace este código).

            if (window.location.pathname.toString() == "/share-room" && currentState["rtdb"]["player-1"]["online"] == false || currentState["rtdb"]["player-2"]["online"] == false) {
                console.error("Player 2 isn't connected");
            }
            if (window.location.pathname.toString() == "/share-room" && currentState["rtdb"]["player-1"]["online"] == true && currentState["rtdb"]["player-2"]["online"] == true) {
                Router.go("/instructions");
            }
        })
    }
    render() {
        const divEl = document.createElement("div");
        const style = document.createElement("style");

        style.innerHTML = `
            .header {
                display: flex;
                justify-content: space-around;
            }
            .counter {
                height: 24px;
                font-size: 24px;
                min-width: 190px;
                font-family: 'American Typewriter', sans;
            }
            .counter-player-2 {
                color: #FF6442;
            }
            .show-room-id__header {
                height: 53px;
                font-size: 24px;
                font-family: 'American Typewriter', sans;
            }
            .room {
                font-weight: bold;
                margin-bottom: 0px;
            }
            .room-id {
                margin: 0px;
            }
            .body-container {
                display: flex;
                flex-direction: column;
            }
            .show-room-id__body {
                height: 179px;
                max-width: 351px;
                margin-top: 50px;
                align-self: center;
            }
            .text {
                font-size: 35px;
                text-align: center;
                font-family: 'American Typewriter', sans;
            }
            .room-id-text {
                font-size: 48px;
                font-weight: bold;
                text-align: center;
                font-family: 'American Typewriter', sans;
            }
            .img__container {
                display: flex;
                margin-top: 23%;
                align-self: center;
                align-items: center;
                justify-content: space-evenly;
            }
        `;

        divEl.innerHTML = `
            <div class="general-container">
                <header class="header">
                    <div class="both-players__counter">
                        <p class="counter counter-player-1"> ${state.data["userName-player1"]}: ${state.data.history["player-1"]} </p>
                    </div>
                    <div class="show-room-id__header">
                        <p class="room"> Room </p>
                        <p class="room-id"> ${state.data["roomId"]} </p>
                    </div>
                </header>

                <div class="body-container">
                    <div class="show-room-id__body">
                        <p class="text"> Share the code: </p>
                        <p class="room-id-text"> ${state.data.roomId} </p>
                        <p class="text"> With the other player! </p>
                    </div>

                    <div class="img__container">
                        <hand-comp hand="scissor"></hand-comp>
                        <hand-comp hand="rock"></hand-comp>
                        <hand-comp hand="paper"></hand-comp>
                    </div>
                </div>
            </div>
        `;

        this.shadow.appendChild(style);
        this.shadow.appendChild(divEl);
    }
}

customElements.define("share-room", shareRoom);