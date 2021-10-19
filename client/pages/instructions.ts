import { Router } from "@vaadin/router";

class instructions extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();

        const playButton = this.shadow.querySelector(".button__new-game");

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
                margin: 25px 0;
                font-size: 80px;
                max-width: 400px;
                padding-left: 40px;
                color: rgba(0, 144, 72, 1);
                font-family: 'American Typewriter', sans;
            }
            .room-full__instructions {
                width: 317px;
                height: 175px;
                font-size: 35px;
                align-items: center;
                font-family: 'American Typewriter', sans;
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
                
                <div class="img__container">
                    <hand-comp hand="tijera"></hand-comp>
                    <hand-comp hand="piedra"></hand-comp>
                    <hand-comp hand="papel"></hand-comp>
                </div>

                <button class="button"> ¡Play! </button>
            </div>
        `;

        this.shadow.appendChild(divEl);
        this.shadow.appendChild(style);
    }
}

customElements.define("instructions-page", instructions);