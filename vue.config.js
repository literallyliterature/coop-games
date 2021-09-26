module.exports = {
  devServer: {
    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000,
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
