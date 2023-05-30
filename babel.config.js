module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            utils: "./src/utils",
            screens: "./src/screens",
            navigation: "./src/navigation",
            hooks: "./src/hooks",
            components: "./src/components",
            assets: "./src/assets",
            constants: "./src/constants",
            configs: "./src/configs",
          },
        },
      ],
      ["react-native-reanimated/plugin"],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        },
      ],
    ],
  };
};
