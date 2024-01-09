// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['.babelrc', 'package.lock.json', 'tsconfig.json'],
})
