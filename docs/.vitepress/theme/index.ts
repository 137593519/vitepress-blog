import DefaultTheme from "vitepress/theme";
import "./custom.scss";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.component("MyGlobalComponent" /* ... */);
  },
};
