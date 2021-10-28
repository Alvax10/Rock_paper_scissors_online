import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    {path: "/", component: "home-page"},
    {path: "/choose-name", component: "choose-name"},
    {path: "/choose-name-second-player", component: "choose-name-second-player"},
    {path: "/cannot-access-room", component: "room-full"},
    {path: "/join-room", component: "join-room"},
    {path: "/share-room", component: "share-room"},
    {path: "/instructions", component: "instructions-page"},
    {path: "/waiting-to-play", component: "waiting-to-play"},
    {path: "/playing", component: "play-page"},
    {path: "/result", component: "result-page"},
]);