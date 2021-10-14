// Guardar información para compartir entre pages/componentes
// Guardar en localStorage (lo necesario)
// Interactuar con local Storage/API

const API_BASE_URL = "http://localhost:3000";

const state = {
    data: {
        userName: "",
        userId: "",
    },
    listeners: [],
    init() {
        const lastLocalStorageState = localStorage.getItem("matches");
    },
    getState() {
        return this.data;
    },
    setUserName(userName) {
        const currentState = this.getState();

        currentState.userName = userName;
    },
    signUp() {
        const currentState = this.getState();

        if (currentState.name) {
            fetch(API_BASE_URL + "/signup", {
                method: "post",
                headers: {
                    Accept:"application/json",
                    "content-type": "application/json",
                    "Cross-Origin-Resource-Policy": "cross-origin",
                },
                body: JSON.stringify({name: currentState.name}),
            }).then((res) => {
                return res.json();
            }).then((data) => {
                currentState.userId = data.id;
                this.setState(currentState);
            })
        }
    },
    setState(newState) {
        this.data = newState;
    
        for (const cb of this.listeners) {
            cb();
        }
        localStorage.setItem("matches", JSON.stringify(newState));
        console.log("Soy el state, he cambiado:", newState);
    }
}

export { state };