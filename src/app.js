require('./db/mongoose.js')
const express = require('express')
const bodyParser = require('body-parser')
const UrlModel = require('./models/url')
const ValidateURL = require('url').URL
const { default: ShortUniqueId } = require('short-unique-id')

const app = express()
const jsonParser = bodyParser.json()

const port = process.env.PORT || 3000

app.post('/api/shorturl/new', jsonParser, async (req, res) => {
  const url = req.body.url
  // validates URL
  try {
    // constructor checks for valid URL, if invalid error is thrown
    new ValidateURL(url)
  } catch (e) {
    // catch above error for when invalid URL is provided
    res.status(400).send({ error: "Invalid URL"})
  }
  
  // interacts with database
  try {
    // queries are async, check if url already exists
    const existingUrl = await UrlModel.findOne({ url })
    const hostname = req.hostname === 'localhost' ? `${req.hostname}:${port}` : req.hostname
    const shortUrl = `${hostname}/shorturl`
    // if it does not exist, create a new document and save
    if (!existingUrl){
      const uid = new ShortUniqueId()
      const newUrl = new UrlModel({ url, hash: uid(10) })
      await newUrl.save()
      res.send({url: `${shortUrl}/${newUrl.hash}`})
    } else {
      // if it exists, send in json
      res.send({url: `${shortUrl}/${existingUrl.hash}`})
    }
  } catch (e){
    res.status(500).send(e)
  }
})


// get request to redirect the URL
app.listen(port, () => {
  console.log('Express is running')
})