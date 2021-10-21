import { Router } from "@vaadin/router";
import { state } from "../state";

class ChooseName extends HTMLElement {

    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
    }
    connectedCallback() {
        this.render();

        const formEl = this.shadow.querySelector(".form");
        const inputNameEl = (this.shadow.querySelector(".input-name") as HTMLInputElement);

        formEl.addEventListener("submit", (e: any) => {
            e.preventDefault();

            state.setFirstPlayerUserName(inputNameEl);
            state.signInFirstPlayer(() => {
                
                state.askNewRoom(()=> {

                    state.accessToRoom(() => {
                        console.log("accedí al room");
                        Router.go("/share-room");
                    });
                });
            });
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
            @media (min-width: 500px) {
                .title__game {
                    padding-left: 70px;
                }
            }
            .form {
                display:flex;
                flex-direction: column;
            }
            .input-name {
                height: 80px;
                width: 275px;
                font-size: 35px;
                padding: 5px 10px;
                background: #FFFFFF;
                border-radius: 10px;
                border: 10px solid #182460;
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
                <form class="form">
                    <input type="text" class="input-name" placeholder="Tu Nombre" />
                    <button class="button">  Empezar </button>
                </form>
                
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

customElements.define("choose-name", ChooseName);