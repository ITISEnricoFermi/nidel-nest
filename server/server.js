const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const socketIO = require('socket.io')
const path = require('path')
const helmet = require('helmet')
const history = require('connect-history-api-fallback')
const compression = require('compression')
const morgan = require('morgan')

let app = express()
var server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 3000

app.use(history())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(helmet())
app.use(morgan('dev'))
app.use(compression())

app.use((req, res, next) => {
  req.messages = []
  next()
})

app.use(express.static(path.join(__dirname, '/public')))

io.on('connection', (socket) => {
  // socket.on('newDocument', () => {
  //   io.emit('newDocument')
  // })
  //
  // socket.on('userDeleted', (user) => {
  //   // io.emit('userDeleted', user)
  //   socket.broadcast.emit('userDeleted')
  // })
})

server.listen(port, () => {
  console.log(`Server started on port ${port}.`)
})
