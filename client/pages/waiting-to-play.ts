import { Router } from "@vaadin/router";
import { state } from "../state";

class waitingToPlay extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();
        const currentState = state.getState();

        state.listenRoom()
        state.suscribe(() => {

            // Esta sección de código chequea desde la rtdb si ambos jugadores están listos para jugar, si es así, los lleva a la playing page.
    
            if (window.location.pathname.toString() == "/waiting-to-play" && currentState["rtdb"]["player-1"]["ready-to-play"] == "" || currentState["rtdb"]["player-2"]["ready-to-play"] == "") {
            
                console.error("One of the players isn't ready");
            }
            if (window.location.pathname.toString() == "/waiting-to-play" && currentState["rtdb"]["player-1"]["ready-to-play"] == "start" && currentState["rtdb"]["player-2"]["ready-to-play"] == "start") {

                Router.go("/playing");
            }
        });
        state.setState(currentState);
    }
    render() {
        
        const divEl = document.createElement("div");
        const style = document.createElement("style");

        style.innerHTML = `
            .general-container {
                height: 100vh;
                display: flex;
                align-items: center;
                flex-direction: column;
            }
            @media (min-height: 800px) {
                .general-container {
                    justify-content: space-evenly;
                }
            }
            .title__game {
                margin: 15px 0;
                font-size: 80px;
                max-width: 400px;
                padding-left: 40px;
                color: rgba(0, 144, 72, 1);
                font-family: 'American Typewriter', sans;
            }
            .room-full__instructions {
                max-width: 500px;
                height: 175px;
                margin: 20px 20px;
                font-size: 35px;
                padding-left: 50px;
                align-items: center;
                font-family: 'American Typewriter', sans;
            }
            .button {
                width: 322px;
                height: 87px;
                margin: 10px 0;
                color: #D8FCFC;
                font-size: 45px;
                text-align: center;
                align-items: center;
                border-radius: 10px;
                justify-content: center;
                background-color: #006CFC;
                border: 10px solid #001997;
                font-family: 'Odibee Sans', cursive;
            }
            .img__container {
                display: flex;
                align-items: center;
                justify-content: space-evenly;
            }
        `;

        divEl.innerHTML = `
            <div class="general-container">
                <h2 class="title__game">
                    Piedra Papel ó Tijera
                </h2>
                
                <h4 class="room-full__instructions"> Waiting for the other player to play!</h4>
                
                <div class="img__container">
                    <hand-comp hand="scissor"></hand-comp>
                    <hand-comp hand="rock"></hand-comp>
                    <hand-comp hand="paper"></hand-comp>
                </div>
            </div>
        `;

        this.shadow.appendChild(divEl);
        this.shadow.appendChild(style);
    }
}

customElements.define("waiting-to-play", waitingToPlay);