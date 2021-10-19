import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    {path: "/", component: "home-page"},
    {path: "/choose-name", component: "choose-name"},
    {path: "/choose-name-second-player", component: "choose-name-second-player"},
    {path: "/room-full-of-players", component: "room-full"},
    {path: "/join-room", component: "join-room"},
    {path: "/share-room", component: "share-room"},
    {path: "/instructions", component: "instructions-page"},
    {path: "/waiting-to-play", component: ""},
    {path: "/playing", component: ""},
]);