import "./router";
import "./pages/home-page";
import "./pages/choose-name";
import "./pages/choose-name-second-player";
import "./pages/room-full";
import "./pages/share-room";
import "./pages/join-room";
import "./pages/instructions";
import { handsComp } from "./components/hands/hands-comp";
import { state } from "./state";

function main() {
    state.init();
    handsComp();
}

main();