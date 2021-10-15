import "./router";
import "./pages/home-page";
import "./pages/choose-name";
import "./pages/join-room";
import { handsComp } from "./components/hands/hands-comp";
import { state } from "./state";

function main() {
    state.init();
    handsComp();
}

main();