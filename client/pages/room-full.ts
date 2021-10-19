import { Router } from "@vaadin/router";

class roomFull extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();

        const buttonLeaveEl = this.shadow.querySelector(".button");

        buttonLeaveEl.addEventListener("click", (e: any) => {
            e.preventDefault();
            Router.go("/");
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
            .room-full__warning {
                width: 317px;
                height: 175px;
                font-size: 35px;
                align-items: center;
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
                
                <h4 class="room-full__warning"> Ups, this room is full and your user name doesn't match with neither of the players!< </h4>
                
                <button class="button"> Leave </button>

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

customElements.define("room-full", roomFull);