import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'www',
      baseUrl: 'https://anidb-e33a0.firebaseapp.com/',
      serviceWorker: {
        globPatterns: [
          '**/*.{js,css,json,html,ico,png,jpeg}'
        ],
        globIgnores: [
          'build/app/svg/*.js',
          'build/app/*.es5.js'
        ]
      },
      copy: [
        { src: 'robots.txt' },
        { src: 'manifest.json' }
      ]
    }
  ],
  globalStyle: 'src/global/app.css'
};