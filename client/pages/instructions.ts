import { Router } from "@vaadin/router";
import { state } from "../state";

class instructions extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();

        const currentState = state.getState();
        const buttonEl = this.shadow.querySelector(".button");

        // Esta sección de código manda directamente a la página siguiente, no sin antes setear a cada jugador que ya están listos para jugar.

        buttonEl.addEventListener("click", (e: any) => {
            e.preventDefault();

            if (currentState["userName-player2"] == "") {

                state.firstPlayerReady(() => {
                    Router.go("/waiting-to-play");
                });
            }
            if (currentState["userName-player1"] == "") {
                        
                state.secondPlayerReady(() => {
                    Router.go("/waiting-to-play");
                });
            }
        });
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
                
                <h4 class="room-full__instructions"> Press play
                and choose: rock, paper o scissor before the times out! </h4>

                <button class="button"> ¡Play! </button>
                
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

customElements.define("instructions-page", instructions);