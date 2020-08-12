const mongoose = require('mongoose')

const urlSchema = mongoose.Schema(
  {
    url: {
      // SchemaType Docs
      type: 'string',
      // Validator Docs
      required: true
    },
    hash: {
      type: 'string',
      required: true
    }
  }
)

const ShortenUrl = mongoose.model('url', urlSchema)

module.exports = ShortenUrl