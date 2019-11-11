import { css } from "docz-plugin-css";
export default {
  esm: "rollup",
  cjs: "rollup",
  umd: {
    name: "comp",
    globals: {
      react: "React"
    }
  },
  doc: {
    plugins: [
      css({
        preprocessor: "stylus",
        cssmodules: true
      })
    ]
  }
};
