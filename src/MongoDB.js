const MongoClient = require('mongodb').MongoClient
const test = require('assert')

// localhost is slow, use 127.0.0.1 instead
const url = 'mongodb://localhost:27017'

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err){
    return console.log('Could not connect to database')
  }

  console.log('MongoDB connected')
})