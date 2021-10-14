import { state } from "../state";

class HomePage extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
        const formEl = this.querySelector(".form");
        formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const currentState = state.getState()
            const userNameEl = (document.querySelector(".input-name") as HTMLInputElement).value.toString();
            
            state.setUserName(userNameEl);
            state.signUp();
            state.setState(currentState);
        });
    }
    render() {
        this.innerHTML = `
            <form class="form">
                <div>
                    <label class="name"> Tu Name </label>
                </div>
                <input type="text" class="input-name" name="name"/>
                <button class="button"> Clickeame para terminar de logearte </button>
            </form>
        `;

    }
}

customElements.define("home-page", HomePage);