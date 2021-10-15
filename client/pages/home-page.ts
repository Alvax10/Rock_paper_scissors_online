import { state } from "../state";

class HomePage extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
        const currentState = state.getState();

        const formEl = this.querySelector(".form");
        formEl.addEventListener("submit", (e: any) => {
            const target = e.target;
            e.preventDefault();

            state.setUserName(target.name.value);
            state.signIn();
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