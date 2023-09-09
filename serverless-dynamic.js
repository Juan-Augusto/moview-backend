module.exports = () => {
  const glob = require('glob')
  const fs = require('fs')
  const YAML = require('yamljs')

  const files = glob.sync('./handlers/**/**.yml')
  const merged = files
    .map((file) => fs.readFileSync(`${file}`, 'utf8'))
    .map((raw) => YAML.parse(raw))
    .reduce((result, handler) => Object.assign(result, handler), {})
  console.info('Merging files:')
  console.info(files)

  return merged
}
