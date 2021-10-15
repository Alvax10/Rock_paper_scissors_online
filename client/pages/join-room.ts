class JoinRoom extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open'});
    }
    connectedCallback() {
        this.render();
    }
    render() {
        const divEl = document.createElement("div");

        divEl.innerHTML = `
            <h2> A tu vieja me la empomo </h2>
        `;

        this.shadow.appendChild(divEl);
    }
}

customElements.define("join-room", JoinRoom);