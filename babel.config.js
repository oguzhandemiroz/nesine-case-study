module.exports = {
  presets: [
    ["@babel/preset-env", { useBuiltIns: false }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};
