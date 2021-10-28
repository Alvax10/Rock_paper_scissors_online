import "./router";
import "./pages/home-page";
import "./pages/choose-name";
import "./pages/choose-name-second-player";
import "./pages/room-full";
import "./pages/share-room";
import "./pages/join-room";
import "./pages/instructions";
import "./pages/waiting-to-play";
import "./pages/playing"
import { handsComp } from "./components/hands/hands-comp";

function main() {
    handsComp();
}

main();