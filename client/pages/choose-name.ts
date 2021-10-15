class ChooseName extends HTMLElement {

    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
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
            .title__game {
                margin: 25px 0;
                max-width: 284px;
                font-size: 80px;
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
                <input type="text" placeholder="Tu Nombre" />
                <button class="button">  Ingresar a la Sala </button>
                
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