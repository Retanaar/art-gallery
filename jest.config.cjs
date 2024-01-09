module.exports = {
  transform: {
    '^.+\\.ts?$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
