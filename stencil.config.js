exports.config = {
  bundles: [
    { components: ['my-app', 'app-home', 'anime-item'] },
    { components: ['app-details', 'anime-details'] },
    { components: ['lazy-img', 'lazy-iframe'] }
  ],
  collections: [
    { name: '@stencil/router' },
    { name: '@ionic/core' }
  ],
  serviceWorker: {
    swSrc: 'src/sw.js'
  },
  globalStyle: 'src/global/app.css'
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
