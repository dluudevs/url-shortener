const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/url-shortener', {
  // properties to avoid deprecation warnings
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  // ensures when mongoose works with mongodb, a new index is created
  useCreateIndex: true,
})