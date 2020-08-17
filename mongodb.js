const mongodb = require('mongoDB')
// MonogClient property gives access to database to perform CRUD operations
// ObjectID to create our own IDs instead of letting the MongoDB handle it

// localhost causes problems, use the localhost ip (port 27017)
const connectionURL = 'mongodb://127.0.0.1:27017'

// options requires useNewUrlParse to parse connection URL properly
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error){
    return console.log('Unable to connect to database')
  }
})