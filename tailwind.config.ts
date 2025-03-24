module.exports = {
  theme: {
    extend: {
      animation: {
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        spin: {
          "100%": { transform: "rotate(360deg)" },
        },
      },
      transitionProperty: {
        "stroke-dashoffset": "stroke-dashoffset",
      },
    },
  },
};
