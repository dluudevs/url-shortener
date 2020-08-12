const mongoose = require('mongoose')

const urlSchema = mongoose.Schema(
  {
    url: {
      // SchemaType Docs
      type: 'string',
      // Validator Docs
      required: true
    },
    _id: {
      type: 'number',
      required: true
    }
  }
)

const ShortenUrl = mongoose.model('url', urlSchema)

module.exports = ShortenUrl