require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const SECRET = process.env.SECRET
const TEST_USERNAME = process.env.TEST_USERNAME
const TEST_PASSWORD = process.env.TEST_PASSWORD

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  TEST_USERNAME,
  TEST_PASSWORD
}
