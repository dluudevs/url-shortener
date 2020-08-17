const mongoose = require('mongoose')

// must set environment variable on heroku for production db
  // create production db with mongodb atlas and add it to mongodb compass 
  // use heroku config:set key=value to set variable
console.log(typeof process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
  // properties to avoid deprecation warnings
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  // ensures when mongoose works with mongodb, a new index is created
  useCreateIndex: true,
})