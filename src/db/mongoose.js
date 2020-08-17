const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/url-shortener', {
  // properties to avoid deprecation warnings
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
  // ensures when mongoose works with mongodb, a new index is created
  useCreateIndex: true,
})