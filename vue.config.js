module.exports = {
  chainWebpack: config => {
    // Remove the old entry and add the new one
    config
      .entry('app')
      .clear()
      .add('./demo/main.js');
  }
};
