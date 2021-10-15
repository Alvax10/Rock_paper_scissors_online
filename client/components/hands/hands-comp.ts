const handFiles = {
    piedra: require("url:../assets/piedra-hand.png"),
    papel: require("url:../assets/papel-hand.png"),
    tijera: require("url:../assets/tijera-hand.png"),
};

export function handsComp() {
    customElements.define("hand-comp", class extends HTMLElement {

        shadow: ShadowRoot;
        constructor() {
            super();
            this.shadow = this.attachShadow({mode: 'open'});
        }
        connectedCallback() {
            this.render();
        }
        addListeners() {
            const handImg: HTMLElement = this.shadow.querySelector(".hand");

            this.addEventListener("click", () => {
                const handClickEvent = new CustomEvent("handClick", {
                    detail: {
                        handMove: this.getAttribute("hand"),
                    },
                });
                this.dispatchEvent(handClickEvent);
            });
        }
        render() {

            const handType = this.getAttribute("hand") || "rock";
            const heightAttr = this.getAttribute("height") || "175px";
            const widthAttr = this.getAttribute("width") || "70px";

            const imgEl = document.createElement("img");
            imgEl.setAttribute("src", handFiles[handType]);
            imgEl.setAttribute("class", "hand");

        const style = document.createElement("style");

        style.innerHTML = `
        @media(min-width: 700px) {
            .piedra {
                width: 80px;
                height: 160px;
            }
            .papel {
                width: 90px;
                height: 160px;
            }
            .tijera {
                width: 70px;
                height: 160px;
            }
        }
        .hand {
            margin: 0 25px;
            height: ${heightAttr};
            width: ${widthAttr};
            transform: translateY(30px);
            transition: all 0.3s ease-in-out;
            cursor: pointer;
        }
        .active-hand {
            transform: translateY(5px);
            transition: all 0.3s ease-in-out;
        }
        .inactive-hand {
            opacity: 45%;
            transition: all 0.3s ease-in-out;
        }
        `;    

        this.shadow.appendChild(style);
        this.shadow.appendChild(imgEl);
        this.addListeners();
    }
    });
}

