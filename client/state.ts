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
        console.log(currentState.userName);
        console.log("este log está antes del setState de setUserName");
        this.setState(currentState);
    },
    signIn() {
        const currentState = this.getState();

        if (currentState.userName) {
            console.log("este es el sign in");
            fetch(API_BASE_URL + "/auth", {
                method:"POST",
                headers: {
                    Accept:"application/json",
                    "content-type": "application/json",
                    "Cross-Origin-Resource-Policy": "cross-origin",
                },
                body: JSON.stringify({ name: currentState.userName}),
            }).then((res) => {
                // console.log(res);
                return res.json();
            }).then((data) => {
                console.log(data);
                currentState.userId = data.id;
                this.setState(currentState);
            });
        } else {
            console.error("userName isn't specified");
        }
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
        localStorage.setItem("matches", JSON.stringify(newState));
        console.log("Soy el state, he cambiado:", newState);
    },
    suscribe(callback: (any) => any) {
        this.listeners.push(callback);
    }
}

export { state };