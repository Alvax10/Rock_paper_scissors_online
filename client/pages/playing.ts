import {state , move} from "../state";
import { Router } from "@vaadin/router";

class  PlayPage extends HTMLElement {

    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.render();
    }
    render() {

        var limitedTimer: number = 3;
        const playContainer = document.createElement("div");
        const style = document.createElement("style");
        playContainer.setAttribute("class", "game-countdown");

        style.innerHTML = `
        .game-countdown {
            display: grid;
            height: inherit;
            align-items: flex-end;
            grid-template-columns: minmax(0, 1fr);
        }
        .mostrar-manos {
            overflow: hidden;
            align-items: flex-end;
            justify-items: center;
            grid-template-rows: repeat(2, minmax(0, 1fr));
        }
        .countdown-timer {
            margin: 0;
            font-size: 128px;
            text-align: center;
        }
        .hands-container-countdown {
            width: 100%;
            display: flex;
            overflow: hidden;
            align-items: flex-end;
            justify-content: space-around;
        }
        .game-hands-show {
            display: flex;
            flex-direction: column;
        }
        .computer-hand {
            padding-top: 155px;
            align-self: flex-start;
            transform: rotate(180deg);
        }
        .user-hand {
            margin-top: 80px;
            transform: translateY(-25px);
        }

        /* Con esto ajusto el contador a todas las pantallas y modifico el circulo del div */

        .circle {
            width: 250px;
            display: flex;
            height: 250px;
            margin: 14% 60px;
            border: 10px solid;
            align-self: center;
            border-radius: 50%;
        }
        .countdown-timer {
            top: 9%;
            left: 38%;
            right: 58%;
            bottom: 87%;
            font-size: 100px;
            position: absolute;
        }
        @media(max-width: 1190px) {
            .countdown-timer {
                top: 5%;
                left: 46%;
                position: absolute;
            }
        }
        @media(min-width: 1200px) {
            .countdown-timer {
                top: 35%;
                left: 48%;
                right: 47%;
                font-size: 100px;
                position: absolute;
            }
        }
        @media(min-height: 500px) {
            .countdown-timer {
                top: 30%;
                left: 47%;
                right: 53%;
                font-size: 100px;
                position: absolute;
            }
        }
        @media(min-height: 900px) {
            .countdown-timer {
                top: 21%;
                left: 47%;
                right: 53%;
                font-size: 100px;
                position: absolute;
            }
        }
        @media(min-width: 1500px) {
            .countdown-timer {
                top: 37%;
                left: 48%;
                right: 48%;
                font-size: 100px;
                position: absolute;
            }
        }
        @media(max-width: 700px) {
            .countdown-timer {
                top: 22%;
                left: 46%;
                right: 55%;
                font-size: 100px;
                position: absolute;
            }
        }
        @media(max-width: 500px) {
            .countdown-timer {
                top: 19%;
                left: 43%;
                right: 54%;
                font-size: 100px;
                position: absolute;
            }
        }
        @media(max-width: 390px) {
            .countdown-timer {
                top: 21%;
                left: 41%;
                right: 53%;
                font-size: 100px;
                position: absolute;
            }
        }
        @media(min-width: 2139px) {
            .countdown-timer {
                top: 29%;
                left: 48.8%;
                right: 53%;
                font-size: 100px;
                position: absolute;
            }
        }
        `;
        
        playContainer.innerHTML = `
            <div class="circle">
            <h2 class="countdown-timer"> ${limitedTimer} </h2>
            </div>
            <div class="hands-container-countdown">
            <hand-comp hand="tijera"></hand-comp>
            <hand-comp hand="piedra"></hand-comp>
            <hand-comp hand="papel"></hand-comp>
            </div>
        `;
        const handComponents = playContainer.querySelectorAll("hand-comp");
        
        handComponents.forEach((hand) => {
    
            hand.addEventListener("handClick", (e: any) => {
    
                const movementChosen = e.detail.handMove;
                state.setMove();
    
                handComponents.forEach((auxHand) => {
    
                    const imageEl = auxHand.shadowRoot.querySelector(".hand");
    
                    if (auxHand.getAttribute("hand") !== movementChosen) {
                        imageEl.classList.add("inactive-hand");
                        imageEl.classList.remove("active-hand");
    
                    } else if (auxHand.getAttribute("hand") === movementChosen) {
                        imageEl.classList.add("active-hand");
                        imageEl.classList.remove("inactive-hand");
                    }
                });
            });
        });
    
        const countdownTimerEl = playContainer.querySelector(".countdown-timer");    
        const currentGame = state.getCurrentGame();
    
        let intervalTimer = setInterval(() => {
            
            if (limitedTimer < 0) {

                clearInterval(intervalTimer);
                playContainer.classList.add("game-hands-show");
                playContainer.innerHTML = `
                    <hand-comp hand=${currentGame["player1-move"]} class="computer-hand" height="215px" width="90px"></hand-comp>
                    <hand-comp hand=${currentGame["player2-move"]} class="user-hand" height="215px" width="90px"></hand-comp>
                `;
                if (currentGame["player1-move"] == "none") {
                    Router.go("/instructions");
                } else {
                    let resultTimer: number = 3;
                    let goToResult = setTimeout(() => {
                        // Router.go("/result");
                        
                        resultTimer --;
                    }, 2000);
                    
                    if (resultTimer === 0) {
                        clearTimeout(goToResult);
                    }
                }
            }
            countdownTimerEl.textContent = limitedTimer.toString();
            
            // limitedTimer --;
        }, 1000);

        this.shadow.appendChild(playContainer);
        this.shadow.appendChild(style);
    }
}

customElements.define("play-page", PlayPage);