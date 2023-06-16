import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    colors: { headers: "#222", headersIcons: "#b7b7b7", promotion: "#ff9e00" },
  },
};
