const express = require('express')
const bodyParser = require('body-parser')
const URL = require('url').URL

const app = express()
const jsonParser = bodyParser.json()

const port = process.env.PORT || 3000

app.post('/api/shorturl/new', jsonParser, (req, res) => {
  const url = req.body.url
  let isUrlValid = true

  try {
    new URL(url)
  } catch (e) {
    console.log(e)
    isUrlValid = false
  }

  if (!isUrlValid){
    return res.send({ error: "Invalid URL"})
  } else {
    console.log('URL is valid!')
  }

  // parse the body
  // check if the URL is valid

  // save it to the database, create some kind of key to keep track

  // retrieve the URL
  // if URL does not exist, save it to the database
  // return shortened URL

})

app.listen(port, () => {
  console.log('Express is running')
})