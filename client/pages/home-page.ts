import { Router } from "@vaadin/router";

class HomePage extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();

        const newGameButton = this.shadow.querySelector(".button__new-game");
        const joinRoomButton = this.shadow.querySelector(".button__join-room");

        newGameButton.addEventListener("click", (e: any) => {
            e.preventDefault();
            Router.go("/choose-name");
        });

        joinRoomButton.addEventListener("click", (e: any) => {
            e.preventDefault();
            Router.go("/choose-name-second-player");
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
                margin: 25px 0;
                font-size: 80px;
                max-width: 400px;
                padding-left: 40px;
                color: rgba(0, 144, 72, 1);
                font-family: 'American Typewriter', sans;
            }
            .button {
                width: 322px;
                height: 87px;
                margin: 20px 0;
                color: #D8FCFC;
                font-size: 45px;
                text-align: center;
                align-items: center;
                border-radius: 10px;
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
                <button class="button button__new-game"> Nuevo Juego </button>
                <button class="button button__join-room">  Ingresar a una Sala </button>
                
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

customElements.define("home-page", HomePage);