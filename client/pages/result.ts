import { state } from "../state";
import { Router } from "@vaadin/router";


class ResultPage extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    connectedCallback() {
        this.render();
    }
    render() {

        const result = {
            "wins-player1": require("url:../components/assets/ganaste.png").toString(),
            "lose-player1": require("url:../components/assets/perdiste.png").toString(),
            "lose-player2": require("url:../components/assets/perdiste.png").toString(),
            "wins-player2": require("url:../components/assets/ganaste.png").toString(),
            "tie": require("url:../components/assets/tiedGame.svg").toString(),
        };

        const resultPageCont = document.createElement("div");
        const style = document.createElement("style");
        resultPageCont.setAttribute("class", "result");

        const currentState = state.getState();

        // Aquí se retorna que jugador ganó o su hubo empate.

        const gameResult = state.getResult(
            currentState["rtdb"]["player-1"]["move"],
            currentState["rtdb"]["player-2"]["move"],
        );
        state.changeHistory(gameResult);

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
            
            .result-button {
                margin-top: 40px;
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
        `;
        
        if (currentState["userName-player2"] == "") {
            // Aquí, en todas las líneas de código inferior, dependiendo que jugador alla ganado, le muestra en la pantalla la imagen de perdedor, ganador o si hubo un empate.

            function showMeWhoWon() {

                if (result[gameResult] == result["wins-player1"]) {
                    var showResult = result["wins-player1"];
                    return showResult;
                }
                if (result[gameResult] == result["lose-player1"]) {
                    var showResult = result["lose-player1"];
                    return showResult;
                }
                if (result[gameResult] == result.tie) {
                    var showResult = result.tie;
                    return showResult;
                }
                return showResult;
            }
             
            resultPageCont.innerHTML = `
                <div class="image-container"> 
                    <img src=${showMeWhoWon()} class="result-image" />
                </div>
                <div class="score-container">
                <h2 class="score-container__title"> Puntaje </h2>
                <article class="score-container__data">
                    <h3 class="score-container__user-data score"> 
                        ${currentState["rtdb"]["player-1"]["userName"]}: ${currentState["history"]["player-1"]}
                    </h3>
                    <h3 class="score-container__computer-data score">
                    ${currentState["rtdb"]["player-2"]["userName"]}: ${currentState["history"]["player-2"]}
                    </h3>
            </article>
            </div>
            <div class="result-button">
                <button-comp class="button">Volver a jugar</button-comp>
            </div>
            `;
        }

        if (currentState["userName-player1"] == "") {

            function showMeWhoWon() {

                if (result[gameResult] == result["wins-player1"]) {
                    var showResult = result["lose-player2"];
                    return showResult;
                }
                if (result[gameResult] == result["lose-player1"]) {
                    var showResult = result["wins-player2"];
                    return showResult;
                }
                if (result[gameResult] == result["tie"]) {
                    var showResult = result.tie;
                    return showResult;
                }
                return showResult;
            }

            resultPageCont.innerHTML = `
                <div class="image-container"> 
                    <img src=${showMeWhoWon()} class="result-image" />
                </div>
                <div class="score-container">
                <h2 class="score-container__title"> Puntaje </h2>
                <article class="score-container__data">
                    <h3 class="score-container__user-data score"> 
                        ${currentState["rtdb"]["player-1"]["userName"]}: ${currentState["history"]["player-1"]}
                    </h3>
                    <h3 class="score-container__computer-data score">
                        ${currentState["rtdb"]["player-2"]["userName"]}: ${currentState["history"]["player-2"]}
                    </h3>
            </article>
            </div>
            <div class="result-button">
                <button-comp class="button">Volver a jugar</button-comp>
            </div>
            `;
        }

        const buttonEl = resultPageCont.querySelector("button-comp");
        buttonEl.addEventListener("click", () => {

            // Aquí, dependiendo que jugador sea, restablece, en la rtdb, los movimientos y si están listos para volver jugar.

            if (currentState["userName-player2"] == "") {

                state.restartGame();
                Router.go("/instructions");
                state.init();
            }
            if (currentState["userName-player1"] == "") {

                state.restartGame();
                Router.go("/instructions");
                state.init();
            }
        });

        this.shadow.appendChild(resultPageCont);
        this.shadow.appendChild(style);
    }
}
customElements.define("result-page", ResultPage);