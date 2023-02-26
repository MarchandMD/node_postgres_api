// require the express package
const express = require('express')
// require the body-parser middleware
const bodyParser = require('body-parser')
// invoke express
const app = express()
// set the port
const port = 3000

// the app constant has access to a #use function that accepts the middleware, which accepts a #json function
app.use(bodyParser.json())
// the app constant us called again with #use, again the bodyParser middleware is called, this time with #urlencoded, and that's receiving the key/value pair of extended: true
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// if the app gets a GET request with the HTTP path of / (so, the root), respond with some JSON info
app.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express and Postgres API',
    additional: 'whatever',
    and_more: '123434',
    integer: 3,
    hash: {
      testing: 'words'
    }
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})