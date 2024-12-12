module.exports = function (api) {
  
    api.cache(true);

    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        ['module:react-native-dotenv', {
          moduleName: '@env',
          path: '.env',
          allowlist: null,
          blacklist: null,
          safe: false,
          allowUndefined: false,
        }],
      ],
      
    };
  };