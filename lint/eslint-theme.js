// NOTE: This is currently unused
import eslint from "./-eslint.config.js";

// TODO: try it and test it when restoring the flat config setup
export default [
  ...eslint,
  {
    ignores: ["javascripts/vendor/*"],
  },
  {
    files: ["*.js", "*.gjs"],
    languageOptions: {
      globals: {
        settings: "readonly",
        themePrefix: "readonly",
      },
    },
  },
];
