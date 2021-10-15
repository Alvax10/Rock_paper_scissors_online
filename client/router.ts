import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    {path: "/", component: "home-page"},
    {path: "/choose-name", component: "choose-name"},
    {path: "/join-room", component: "join-room"},
]);