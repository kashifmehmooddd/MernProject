const mongoose = require('mongoose')
const config = require('config')
const dbURI = config.get('mongoURI')

const connectDb = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log("db connected :)")
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDb
