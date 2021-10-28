import { state } from "../state";
import { Router } from "@vaadin/router";


class ResultPage extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
    }
    render() {

        const result = {
            "wins-player1": require("url:../components/assets/ganaste.png"),
            "wins-player2": require("url:../components/assets/perdiste.png"),
            tie: require("url:../components/assets/tiedGame.svg"),
        };

        const resultPageCont = document.createElement("div");
        const style = document.createElement("style");
        resultPageCont.setAttribute("class", "result");

        const currentGame = state.getCurrentGame();
        const gameResult = state.getResult(
            currentGame["rtdb"]["player-1"]["move"],
            currentGame["rtdb"]["player-2"]["move"],
        );

        state.changeHistory(gameResult);
        const currentHistory = state.getState().history;

        state.restartGame();

        style.innerHTML = `
            .result {
                display: flex;
                align-items: center;
                flex-direction: column;
                height: inherit;
                padding: 20px 0 20px 0;
            }
        
            .image-container {
                width: 250px;
                height: 250px;
                margin-bottom: 15px;
            }
            
            .result-image {
                width: 100%;
                height: 100%;
            }
            
            .score-container {
                width: 250px;
            }
            
            .score-container {
                padding: 15px;
            
                text-align: center;
                border: solid 5px black;
                background-color: white;
            }
            
            .score-container__title,
            .score {
                margin: 0;
            }
            
            .score-container__title {
                font-size: 55px;
                margin-bottom: 15px;
            }
            
            .score {
                font-size: 45px;
            }
            
            .button-container {
                width: 100%;
                margin-top: auto;
            }
            `;

        resultPageCont.innerHTML = `
            <div class="image-container"> 
                <img src=${result[gameResult]} class="result-image" />
            </div>
            <div class="score-container">
            <h2 class="score-container__title"> Puntaje </h2>
            <article class="score-container__data">
                <h3 class="score-container__user-data score"> 
                    Vos: ${currentHistory.player1}
                </h3>
                <h3 class="score-container__computer-data score">
                    Máquina: ${currentHistory.player2}
                </h3>
        </article>
        </div>
        <div class="button result-button">
            <button-comp variant="button result-button">Volver a jugar</button-comp>
        </div>
        `;

        const buttonEl = resultPageCont.querySelector("button-comp");
        buttonEl.addEventListener("click", () => {

            Router.go("/instrucciones");
            state.init();
        });

        this.shadow.appendChild(resultPageCont);
    }
}
customElements.define("result-page", ResultPage);