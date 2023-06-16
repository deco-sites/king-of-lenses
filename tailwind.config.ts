import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    colors: {
      headers: "#222",
      headersIcons: "#b7b7b7",
      promotion: "#ff9e00",
      comomText: "#777",
      titleText: "#3f3f40",
      footerText: "#6c6d6f",
    },
    minWidth: {
      "1/2": "50%",
    },
  },
};
