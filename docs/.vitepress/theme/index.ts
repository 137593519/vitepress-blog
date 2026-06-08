import DefaultTheme from "vitepress/theme";
import { h, defineComponent } from "vue";
import { useData } from "vitepress";
import "./custom.scss";

// 首页粒子背景组件
const HomeParticles = defineComponent({
  setup() {
    const { frontmatter } = useData();
    return () =>
      frontmatter.value.layout === "home"
        ? h(
            "div",
            { class: "home-particles" },
            Array.from({ length: 25 }, () => h("div", { class: "particle" }))
          )
        : null;
  },
});

export default {
  ...DefaultTheme,
  Layout: h(DefaultTheme.Layout, null, {
    "layout-bottom": () => h(HomeParticles),
  }),
  enhanceApp({ app }: { app: any }) {},
};
