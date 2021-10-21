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

        alert("Your parter has 25 seconds to join the room");

        var limitedTime = 25;
        state.loadInfoToTheRtdb(() => {
        let intervalTimer = setInterval(() => {

            if (limitedTime <= 0 && currentState["userName-player2"] == "") {
        
                clearInterval(intervalTimer);
                alert("The other player didn't connect to the room in time");
                Router.go("/");
    
            } else if (limitedTime < 10 && currentState["userName-player2"] == "") {
        
                clearInterval(intervalTimer);
                state.loadInfoToTheRtdb(() => {

                    state.setState(currentState);
                    if (currentState["player2-online"] && currentState["player1-online"] == true) {
                        
                        Router.go("/instructions");
                    }
                });
            }
            console.log(limitedTime);
            limitedTime --;
        }, 1000);

        });
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
                        <p class="counter counter-player-1"> ${state.data["userName-player1"]}: ${state.data.history.player1} </p>
                        <p class="counter counter-player-2"> ${state.data["userName-player2"]}: ${state.data.history.player2} </p>
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
                        <hand-comp hand="tijera"></hand-comp>
                        <hand-comp hand="piedra"></hand-comp>
                        <hand-comp hand="papel"></hand-comp>
                    </div>
                </div>
            </div>
        `;

        this.shadow.appendChild(style);
        this.shadow.appendChild(divEl);
    }
}

customElements.define("share-room", shareRoom);