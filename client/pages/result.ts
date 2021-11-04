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
            "wins-player1": require("url:../components/assets/ganaste.png"),
            "lose-player1": require("url:../components/assets/perdiste.png"),
            "wins-player2": require("url:../components/assets/perdiste.png"),
            "lose-player2": require("url:../components/assets/ganaste.png"),
            "tie": require("url:../components/assets/tiedGame.svg"),
        };

        const resultPageCont = document.createElement("div");
        const style = document.createElement("style");
        resultPageCont.setAttribute("class", "result");

        const currentState = state.getState();

        const gameResult = state.getResult(
            currentState["rtdb"]["player-1"]["move"],
            currentState["rtdb"]["player-2"]["move"],
        );

        console.log(gameResult.toString())

        state.changeHistory(gameResult);
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

            function showMeWhoWon() {
                var showPlayer1Result = "";
                
                if (result[gameResult] == "wins-player1") {
                    showPlayer1Result = "lose-player2";
                    this.render();
                }
                if (result[gameResult] == "wins-player2") {
                    showPlayer1Result = "lose-player1";
                    this.render();
                }
                if (result[gameResult] == "tie") {
                    showPlayer1Result = "tie";
                    this.render();
                }
                console.log(showPlayer1Result);
                return showPlayer1Result;
            }

            console.log(showMeWhoWon());
             
            resultPageCont.innerHTML = `
                <div class="image-container"> 
                    <img src="${showMeWhoWon()}" class="result-image" />
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
                var showPlayer2Result = "";
                
                if (result[gameResult] == "wins-player1") {
                    showPlayer2Result = "lose-player2";
                    this.render();
                }
                if (result[gameResult] == "wins-player2") {
                    showPlayer2Result = "lose-player1";
                    this.render();
                }
                if (result[gameResult] == "tie") {
                    showPlayer2Result = "tie";
                    this.render();
                }
                console.log(showPlayer2Result);
                return showPlayer2Result;
            }
            
            console.log(showMeWhoWon());

            resultPageCont.innerHTML = `
                <div class="image-container"> 
                    <img src="${showMeWhoWon()}" class="result-image" />
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

        // const buttonEl = resultPageCont.querySelector("button-comp");
        // buttonEl.addEventListener("click", () => {

        //     Router.go("/instrucciones");
        //     state.init();
        // });

        this.shadow.appendChild(resultPageCont);
        this.shadow.appendChild(style);
    }
}
customElements.define("result-page", ResultPage);