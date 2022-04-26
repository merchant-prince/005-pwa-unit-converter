import { createApp } from "vue";
import App from "./App.vue";
// import { registerSW } from "virtual:pwa-register";

// @todo: activate when deploying
// if ("serviceWorker" in navigator) {
//   registerSW();
// }

createApp(App).mount("#app");
