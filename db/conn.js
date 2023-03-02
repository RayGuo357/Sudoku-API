const mongoose = require("mongoose");
const Db = process.env.ATLAS_URI;

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
  }
}

module.exports = connectDb
