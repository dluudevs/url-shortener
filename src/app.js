require('./db/mongoose.js')
const express = require('express')
const bodyParser = require('body-parser')
const UrlModel = require('./models/url')
const dnsPromises = require('dns').promises
const { default: ShortUniqueId } = require('short-unique-id')
const hbs = require('hbs')
const path = require('path')

const app = express()
const jsonParser = bodyParser.json()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// for css and assets - use method to register middleware
app.use(express.static(publicPath))
// set viewengine to use HBS - set method registers properties (notice the pair)
app.set('view engine', 'hbs')
// render method will look for views in this path
app.set('views', viewsPath)
// register partials path so they can be referenced in hbs files
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'URL Shortener'
  })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About'})
})

app.post('/api/shorturl/new', jsonParser, async (req, res) => {
  const url = req.body.url
  // parse string to get hostname
  let parsedUrl = url.match('https') ? url.replace('https://', '') : url.replace('http://', '')
  const urlIndex = parsedUrl.indexOf('/')
  parsedUrl = urlIndex > - 1 ? parsedUrl.substring(0, urlIndex) : parsedUrl
  
  // validate hostname
  try {
    await dnsPromises.lookup(parsedUrl)
  } catch (e) {
    // will exit route handler function and not run below code
    return res.send({ error: "Invalid URL"})
  }
  
  // interact with database
  try {
    // queries are async, check if url already exists
    const existingUrl = await UrlModel.findOne({ url })
    const hostname = req.hostname === 'localhost' ? `${req.hostname}:${port}` : req.hostname
    const shortUrl = `${hostname}/shorturl`
    // if url does not exist, create a new document and save
    if (!existingUrl){
      const uid = new ShortUniqueId() 
      const newUrl = new UrlModel({ url, hash: uid(10) })
      await newUrl.save()
      res.send({url: `${shortUrl}/${newUrl.hash}`})
    } else {
      // if url exists, send back url
      res.send({url: `${shortUrl}/${existingUrl.hash}`})
    }
  } catch (e){
    // status 500 for when there is an error communicating with the server
    res.status(500).send(e)
  }
})

app.get('/shorturl/:id', async (req, res) => {
  try {
    const { url } = await UrlModel.findOne({ hash: req.params.id })
    res.redirect(url)
  } catch (e) {
    res.status(500).send(e)
  }
})

// get request to redirect the URL
app.listen(port, () => {
  console.log('Express is running')
})