const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
  // properties to avoid deprecation warnings
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  // ensures when mongoose works with mongodb, a new index is created
  useCreateIndex: true,
})