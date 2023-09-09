const env = require('dotenv').config({ path: './.env.development' })
module.exports = () => {
  console.log(env.parsed)
  return env.parsed
}
