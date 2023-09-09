const env = require('dotenv').config({ path: './.env.production' })
module.exports = () => {
  console.log(env.parsed)
  return env.parsed
}
