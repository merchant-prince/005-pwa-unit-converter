import { createApp } from "vue";
import App from "./App.vue";
import { registerSW } from "virtual:pwa-register";
import "./index.css";

if ("serviceWorker" in navigator) {
  registerSW();
}

createApp(App).mount("#application");
