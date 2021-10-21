import { Router } from "@vaadin/router";

class instructions extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();

        const playButton = this.shadow.querySelector(".button");

        playButton.addEventListener("click", (e: any) => {
            e.preventDefault();
            
            Router.go("/waiting-to-play");
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
                    <hand-comp hand="tijera"></hand-comp>
                    <hand-comp hand="piedra"></hand-comp>
                    <hand-comp hand="papel"></hand-comp>
                </div>
            </div>
        `;

        this.shadow.appendChild(divEl);
        this.shadow.appendChild(style);
    }
}

customElements.define("instructions-page", instructions);