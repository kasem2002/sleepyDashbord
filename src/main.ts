/* eslint-disable import/order */
import "@/@iconify/icons-bundle";
import App from "@/App.vue";
import layoutsPlugin from "@/plugins/layouts";
import vuetify from "@/plugins/vuetify";
import { loadFonts } from "@/plugins/webfontloader";
import router from "@/router";
import "@core/scss/template/index.scss";
import OneSignalVuePlugin from "@onesignal/onesignal-vue3";
import "@styles/styles.scss";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "vue3-toastify/dist/index.css";

loadFonts();

// Create vue app
const app = createApp(App);

// Use plugins
app.use(vuetify);
app.use(createPinia());
app.use(router);
app.use(layoutsPlugin);
app.use(OneSignalVuePlugin, {
  appId: "b81793f9-be3f-4d4f-9627-8e6a1722abf3",
});
// Mount vue app
app.mount("#app");
