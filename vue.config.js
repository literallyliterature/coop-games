module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/coop-games/' : '/',
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
