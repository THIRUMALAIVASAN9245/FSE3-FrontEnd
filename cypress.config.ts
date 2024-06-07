import { defineConfig } from 'cypress'
import coverageWebpack from './cypress/coverage.webpack'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200'
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      webpackConfig:coverageWebpack
    },
    specPattern: '**/*.cy.ts',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  }

})

// import { defineConfig } from 'cypress'

// export default defineConfig({
//   videosFolder: 'cypress/videos',
//   screenshotsFolder: 'cypress/screenshots',
//   fixturesFolder: 'cypress/fixtures',
//   video: false,
//   e2e: {
//     // We've imported your old cypress plugins here.
//     // You may want to clean this up later by importing these.
//     setupNodeEvents(on, config) {
//       return require('./cypress/plugins/index.ts').default(on, config)
//     },
//     baseUrl: 'http://localhost:4200',
//   },
// })